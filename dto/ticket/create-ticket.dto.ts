import { AutoMap } from "@automapper/classes";
import { Transform } from "class-transformer";
import {
  IsString,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from "class-validator";

export class CreateTicketDto {
  @AutoMap()
  @IsNumber()
  @IsOptional()
  ID?: bigint;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  Title!: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  Description!: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  Priority!: string;

  @AutoMap()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  ExpectedStartDate!: Date;

  @AutoMap()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  ExpectedEndDate!: Date;

  @AutoMap()
  @IsString()
  @IsOptional()
  LeadTime?: string;

  @AutoMap()
  @IsDate()
  @IsOptional()
  ActualStartDate?: Date;

  @AutoMap()
  @IsDate()
  @IsOptional()
  ActualEndDate?: Date;

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  Assignee!: bigint;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  Reporter!: bigint;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  TicketStatus!: string;

  @AutoMap()
  @IsBoolean()
  @IsNotEmpty()
  Status!: boolean;
}