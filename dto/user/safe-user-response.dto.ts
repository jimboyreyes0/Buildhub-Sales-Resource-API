import { AutoMap } from "@automapper/classes";
import { RoleDTO } from "../role/role.dto";

export class SafeUserResponseDTO {
  @AutoMap()
  ID!: bigint;
  @AutoMap()
  FirstName!: string;
  @AutoMap()
  LastName!: string;
  @AutoMap()
  Role!: number;
  @AutoMap(() => RoleDTO)
  _Role?: RoleDTO;
  @AutoMap()
  Status!: boolean;
}
