import { IsString } from "@nestjs/class-validator";

export class CreateHistoriaDto {

  @IsString()
  patientName: string;

  @IsString()
  date: string;

  @IsString()
  symptoms: string;

  @IsString()
  treatment: string;
}
