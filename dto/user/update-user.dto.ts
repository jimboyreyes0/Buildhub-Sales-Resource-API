import { AutoMap } from "@automapper/classes";
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from "class-validator";

export class UpdateUserDTO {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  FirstName!: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  LastName!: string;

  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  EmailAddress!: string;

  @AutoMap()
  @IsNumber()
  Role!: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  Username!: string;

  @AutoMap()
  Password!: string;

  @AutoMap()
  @IsBoolean()
  Status!: boolean;
}
