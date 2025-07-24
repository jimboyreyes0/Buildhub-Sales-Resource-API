export default interface ITickets {
  ID: number;
  Title: Text;
  Description: Text;
  Priority: string;
  ExpectedStartDate: Date;
  ExpectedEndDate: Date;
  LeadTime: string;
  ActualStartDate: Date;
  ActualEndDate: Date;
  Assignee: number;
  Reporter: number;
  TicketStatus: string;
  Status: boolean;
}
