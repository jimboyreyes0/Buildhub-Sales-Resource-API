import { AutoMap } from "@automapper/classes";
import { SafeUserResponseDTO } from "../user/safe-user-response.dto";

export class ApprovalResponseDTO {
  @AutoMap()
  ID!: bigint;
  @AutoMap()
  TicketID!: bigint;
  @AutoMap()
  UserID!: bigint;
  @AutoMap(() => SafeUserResponseDTO)
  _Approver!: SafeUserResponseDTO;
  @AutoMap()
  ApprovalStatus!: boolean;
  @AutoMap()
  ApprovalType!: string;
  @AutoMap()
  Comment!: string;
  @AutoMap()
  createdAt!: Date;
  @AutoMap()
  updatedAt!: Date;
  @AutoMap()
  Status!: boolean;
}
