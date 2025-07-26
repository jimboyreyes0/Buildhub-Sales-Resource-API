import { TicketEntity } from "../entities/ticket.entity";
import Roles from "../models/Roles.model";
import Tickets from "../models/Tickets.model";
import Users from "../models/Users.model";

export default class TicketsService {
  async createTicket(ticketData: TicketEntity): Promise<TicketEntity> {
    const createdTicket = await Tickets.create(ticketData);
    return createdTicket.get({ plain: true }) as TicketEntity;
  }
  async findAll(): Promise<TicketEntity[]> {
    return await Tickets.findAll({
      where: {
        Status: true,
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
      ],
    });
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
}
