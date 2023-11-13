import { IsArray, IsMilitaryTime, IsNumber, IsString } from "@nestjs/class-validator";
import { DateTime } from "luxon";
import { Specialty } from "src/common/enums/specialty.enum";

export class CreateMedicoDto {

  @IsString()
  medicName: string;

  @IsString()
  medicLastname: string;

  @IsNumber()
  registrationNumber: number;

  @IsString()
  specialty: Specialty;

  @IsNumber()
  hospitalId: number;

  @IsNumber()
  userId: number;

  @IsMilitaryTime()
  startTime: DateTime;

  @IsMilitaryTime()
  endTime: DateTime;

  @IsArray()
  @IsNumber({}, { each: true })
  workingDays: number[];
}
