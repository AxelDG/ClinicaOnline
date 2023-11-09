import { IsMilitaryTime, IsNumber, IsString } from "@nestjs/class-validator";
import { DateTime } from "luxon";

export class UpdateTurnoDto {

  @IsNumber()
  medicId?: number;

  @IsNumber()
  patientId?: number;

  @IsString()
  date?: DateTime;

  @IsMilitaryTime()
  startTime?: DateTime;

  @IsMilitaryTime()
  endTime?: DateTime;
}
