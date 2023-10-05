import { IsDateString, IsNumber } from "@nestjs/class-validator";

export class CreateTurnoDto {

  @IsNumber()
  medicId: number;

  @IsNumber()
  patientId: number;

  @IsDateString()
  date: Date;

}
