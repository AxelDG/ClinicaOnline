import { IsDateString, IsNumber } from "@nestjs/class-validator";

export class UpdateTurnoDto {

  @IsNumber()
  medicId?: number;

  @IsNumber()
  patientId?: number;

  @IsDateString()
  date?: Date;
}
