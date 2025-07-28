import { GetTicketDto } from "../dto/ticket/get-ticket.dto";
import { TicketEntity } from "../entities/ticket.entity";
import Approvals from "../models/Approvals.model";
import Roles from "../models/Roles.model";
import Tickets from "../models/Tickets.model";
import Users from "../models/Users.model";
import { Op } from "sequelize";

import approvalWorkflowSettings from "../approval-settings.json";
import ITicketsApprovals from "../interfaces/TicketsApprovals.interface";
import { ApprovalDecisionDto } from "../dto/approval/approval.dto";
export default class TicketsService {
  async createTicket(ticketData: TicketEntity): Promise<TicketEntity> {
    const createdTicket = await Tickets.create(ticketData);
    return createdTicket.get({ plain: true }) as TicketEntity;
  }
  async findAll(filter: GetTicketDto): Promise<TicketEntity[]> {
    const whereClause: any = {
      Status: true,
    };

    if (filter.FilterField && filter.Value) {
      whereClause[filter.FilterField] = {
        [Op.like]: `%${filter.Value}%`,
      };
    }
    const tickets = await Tickets.findAll({
      where: whereClause,
      include: [
        {
          model: Users,
          as: "_Reporter",
          include: [
            {
              model: Roles,
              as: "_Role",
            },
          ],
        },
        {
          model: Users,
          as: "_Assignee",
          include: [
            {
              model: Roles,
              as: "_Role",
            },
          ],
        },
        {
          model: Approvals,
          as: "_Approvals",
          where: {
            Status: true,
          },
          include: [
            {
              model: Users,
              as: "_Approver",
              include: [
                {
                  model: Roles,
                  as: "_Role",
                },
              ],
            },
          ],
          required: false,
        },
      ],
    });
    return tickets;
  }
  async findById(id: bigint): Promise<TicketEntity | null> {
    return await Tickets.findOne({
      where: {
        ID: id,
        Status: true,
      },
      include: [
        {
          model: Users,
          as: "_Reporter",
        },
        {
          model: Users,
          as: "_Assignee",
        },
      ],
    });
  }
  async findForApprovalTickets(userId: bigint): Promise<TicketEntity[]> {
    const userIdNum = Number(userId);

    let _approvalWorkflow: any = approvalWorkflowSettings.approvalWorkflow;
    const workflow = _approvalWorkflow.levels;
    const finalLevel = Math.max(...workflow.map((l: any) => l.level));

    const allTickets = (await Tickets.findAll({
      include: [
        {
          model: Approvals,
          as: "_Approvals",
          required: false,
        },
        {
          model: Users,
          as: "_Reporter",
        },
        {
          model: Users,
          as: "_Assignee",
        },
      ],
    })) as TicketEntity[];

    const ticketsForUser = allTickets.filter((ticket) => {
      const ticketApprovals = ticket._Approvals || [];

      const usersApprovalLevels = workflow.filter((level: any) =>
        level.approvers.some((approver: any) => approver.ID === userIdNum)
      );

      for (const level of usersApprovalLevels) {
        const isFinalLevel = level.level === finalLevel;

        const isFullyApproved = ticketApprovals.some(
          (a: any) =>
            a.ApprovalType === `level-${finalLevel}` &&
            (a.ApprovalStatus === true || a.ApprovalStatus === false)
        );

        if (isFullyApproved) {
          return false;
        }

        if (isFinalLevel) {
          return true;
        }

        const prevLevelsComplete = workflow
          .filter((l: any) => l.level < level.level)
          .every((prevLevel: any) => {
            const requiredApprovals = prevLevel.approvers.length;
            const existingApprovals = ticketApprovals.filter(
              (a: any) =>
                a.ApprovalStatus === true &&
                a.ApprovalType === `level-${prevLevel.level}`
            ).length;
            return requiredApprovals === existingApprovals;
          });

        const userHasApproved = ticketApprovals.some(
          (a: any) =>
            a.UserID === userId &&
            a.ApprovalType === `level-${level.level}` &&
            (a.ApprovalStatus === true || a.ApprovalStatus === false)
        );

        if (prevLevelsComplete && !userHasApproved) {
          return true;
        }
      }

      return false;
    });

    return ticketsForUser;
  }
  async updateTicketApproval(
    decision: ApprovalDecisionDto
  ): Promise<TicketEntity | null> {
    const {
      TicketID,
      UserID,
      IsApproved,
      ActualStartDate,
      ActualEndDate,
      LeadTime,
      Comment,
    } = decision;

    const ticket = (await Tickets.findOne({
      where: { ID: TicketID, Status: true },
      include: [{ model: Approvals, as: "_Approvals" }],
    })) as TicketEntity;

    if (!ticket) return null;

    const workflow = approvalWorkflowSettings.approvalWorkflow.levels;
    const finalLevel = Math.max(...workflow.map((l) => l.level));

    const usersApprovalLevels = workflow.filter((level) =>
      level.approvers.some((approver) => approver.ID === Number(UserID))
    );

    if (usersApprovalLevels.length === 0) return null;

    const usersApprovalLevel = Math.max(
      ...usersApprovalLevels.map((l) => l.level)
    );

    const isFullyApproved = (ticket._Approvals || []).some(
      (a) =>
        a.ApprovalType === `level-${finalLevel}` && a.ApprovalStatus === true
    );
    if (isFullyApproved) return null;

    await Tickets.update(
      {
        LeadTime,
        ActualStartDate,
        ActualEndDate,
      },
      { where: { ID: TicketID } }
    );

    await Approvals.create({
      TicketID,
      UserID,
      ApprovalStatus: IsApproved,
      ApprovalType: `level-${usersApprovalLevel}`,
      Comment: Comment || "",
      Status: true,
    });

    const updatedTicket = await Tickets.findOne({
      where: {
        ID: TicketID,
      },
      include: [
        {
          model: Users,
          as: "_Reporter",
          include: [
            {
              model: Roles,
              as: "_Role",
            },
          ],
        },
        {
          model: Users,
          as: "_Assignee",
          include: [
            {
              model: Roles,
              as: "_Role",
            },
          ],
        },
        {
          model: Approvals,
          as: "_Approvals",
          where: {
            Status: true,
          },
          include: [
            {
              model: Users,
              as: "_Approver",
              include: [
                {
                  model: Roles,
                  as: "_Role",
                },
              ],
            },
          ],
          required: false,
        },
      ],
    });

    return updatedTicket;
  }
}
