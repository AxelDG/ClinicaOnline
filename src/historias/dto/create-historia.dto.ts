import { IsDateString, IsNumber, IsString } from "@nestjs/class-validator";

export class CreateHistoriaDto {

  @IsDateString()
  date: Date;

  @IsString()
  symptoms: string;

  @IsString()
  treatment: string;

  @IsNumber()
  patientId: number;
}
