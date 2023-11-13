import { IsArray, IsMilitaryTime, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { DateTime } from "luxon";
import { Specialty } from "src/common/enums/specialty.enum";

export class UpdateMedicoDto {

  @IsOptional()
  @IsString()
  medicName?: string;

  @IsOptional()
  @IsString()
  medicLastname?: string;

  @IsOptional()
  @IsNumber()
  registrationNumber?: number;

  @IsOptional()
  @IsString()
  specialty?: Specialty;

  @IsOptional()
  @IsNumber()
  hospitalId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsMilitaryTime()
  startTime?: DateTime;

  @IsOptional()
  @IsMilitaryTime()
  endTime?: DateTime;


  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  workingDays?: number[];
}
