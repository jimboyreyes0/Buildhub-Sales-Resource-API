import { AutoMap } from "@automapper/classes";
import { UserResponseDTO } from "../dto/user/user-response.dto";
import { UserEntity } from "./user.entity";

export class TicketEntity {
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
  LeadTime!: string;
  @AutoMap()
  ActualStartDate!: Date;
  @AutoMap()
  ActualEndDate!: Date;
  @AutoMap()
  Assignee!: bigint;
  @AutoMap(() => UserEntity)
  _Assignee?: UserEntity;
  @AutoMap()
  Reporter!: bigint;
  @AutoMap(() => UserEntity)
  _Reporter?: UserEntity;
  @AutoMap()
  TicketStatus!: string;
  @AutoMap()
  Status!: boolean;
}
