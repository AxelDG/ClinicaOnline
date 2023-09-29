import { IsNumber, IsString } from "@nestjs/class-validator";

export class CreateHistoriaDto {

  @IsString()
  date: string;

  @IsString()
  symptoms: string;

  @IsString()
  treatment: string;

  @IsNumber()
  patientId: number;
}
