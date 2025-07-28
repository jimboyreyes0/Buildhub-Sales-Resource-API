export default interface IApprovals {
  ID?: bigint;
  TicketID: bigint;
  UserID: bigint;
  ApprovalStatus: boolean;
  ApprovalType: string;
  Comment?: string;
  Status: boolean;
}
