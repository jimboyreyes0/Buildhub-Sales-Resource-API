import { AutoMap } from "@automapper/classes";
import { RoleDTO } from "../role/role.dto";

export class UserResponseDTO {
  @AutoMap()
  ID!: bigint;
  @AutoMap()
  FirstName!: string;
  @AutoMap()
  LastName!: string;
  @AutoMap()
  EmailAddress!: string;
  @AutoMap()
  Role!: number;
  @AutoMap(() => RoleDTO)
  _Role?: RoleDTO;
  @AutoMap()
  Username!: string;
  @AutoMap()
  Status!: boolean;
}
