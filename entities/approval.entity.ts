import { AutoMap } from "@automapper/classes";
import { RoleDTO } from "../dto/role/role.dto";
import { UserEntity } from "./user.entity";

export class ApprovalEntity {
  @AutoMap()
  ID!: bigint;
  @AutoMap()
  TicketID!: bigint;
  @AutoMap()
  UserID!: bigint;
  @AutoMap(() => UserEntity)
  _Approver?: UserEntity;
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
