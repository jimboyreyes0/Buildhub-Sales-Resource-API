import { AutoMap } from "@automapper/classes";
import { IsString, IsOptional, IsIn } from "class-validator";

const ALLOWED_FILTER_FIELDS = [
  "Title",
  "Description",
  "Priority",
  "TicketStatus",
];

export class GetTicketDto {
  @AutoMap()
  @IsString()
  @IsOptional()
  @IsIn(ALLOWED_FILTER_FIELDS, { message: "Invalid filter field" })
  FilterField?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  Value?: string;
}
