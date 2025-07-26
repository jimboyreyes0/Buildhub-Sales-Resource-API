export default interface ITickets {
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
}
