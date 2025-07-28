import { AutoMap } from "@automapper/classes";
import { UserResponseDTO } from "../user/user-response.dto";
import { SafeUserResponseDTO } from "../user/safe-user-response.dto";
import { ApprovalResponseDTO } from "../approval/approval-response.dto";

export class TicketResponseDto {
  @AutoMap()
  ID!: bigint;

  @AutoMap()
  Title!: string;

  @AutoMap()
  Description!: string;

  @AutoMap()
  Priority!: string;

  @AutoMap()
  ExpectedStartDate!: Date;

  @AutoMap()
  ExpectedEndDate!: Date;

  @AutoMap()
  LeadTime?: string;

  @AutoMap()
  ActualStartDate?: Date;

  @AutoMap()
  ActualEndDate?: Date;

  @AutoMap()
  TicketStatus?: string;

  @AutoMap()
  Status!: boolean;

  @AutoMap(() => SafeUserResponseDTO)
  _Reporter?: SafeUserResponseDTO;

  @AutoMap(() => SafeUserResponseDTO)
  _Assignee?: SafeUserResponseDTO;

  @AutoMap(() => ApprovalResponseDTO)
  _Approvals?: ApprovalResponseDTO;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
