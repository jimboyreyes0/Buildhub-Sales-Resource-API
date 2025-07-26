import { AutoMap } from "@automapper/classes";
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from "class-validator";

export class LoginUserDTO {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  Username!: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  Password!: string;
}
