import { AutoMap } from "@automapper/classes";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class ApprovalDecisionDto {
  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  TicketID!: bigint;
  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  UserID!: bigint;
  @AutoMap()
  @IsNotEmpty()
  @IsBoolean()
  IsApproved!: boolean;
  @AutoMap()
  @IsOptional()
  @IsString()
  Comment?: string;
  @AutoMap()
  @IsOptional()
  @IsString()
  LeadTime?: string;
  @AutoMap()
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  ActualStartDate?: Date;
  @AutoMap()
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  ActualEndDate?: Date;
}
