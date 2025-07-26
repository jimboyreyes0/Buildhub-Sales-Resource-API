import { AutoMap } from "@automapper/classes";

export class UserEntity {
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
  Password!: string;
  @AutoMap()
  Status!: boolean;
}
