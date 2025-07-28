import { UserEntity } from "../entities/user.entity";
import IApprovals from "./Approvals.interface";

export default interface ITicketsApprovals {
  ID: bigint;
  Title: string;
  Description: string;
  Priority: string;
  ExpectedStartDate: Date;
  ExpectedEndDate: Date;
  LeadTime: string;
  ActualStartDate: Date;
  ActualEndDate: Date;
  Assignee: bigint;
  Reporter: bigint;
  TicketStatus: string;
  Status: boolean;
  _Approvals?: IApprovals[];
  _Reporter?: UserEntity;
  _Assignee?: UserEntity;
}
