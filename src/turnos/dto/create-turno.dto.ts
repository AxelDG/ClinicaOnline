import { IsDateString, IsNumber } from "@nestjs/class-validator";

export class CreateTurnoDto {

  @IsNumber()
  patientId: number;

  @IsNumber()
  medicId: number;

  @IsDateString()
  date: Date;

}
