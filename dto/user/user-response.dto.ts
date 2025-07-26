import { AutoMap } from "@automapper/classes";

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
  @AutoMap()
  Username!: string;
  @AutoMap()
  Status!: boolean;
}
