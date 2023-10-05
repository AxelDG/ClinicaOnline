import { IsDateString, IsNumber, IsString } from "@nestjs/class-validator";

export class UpdateHistoriaDto {

  @IsDateString()
  date?: Date;

  @IsString()
  symptoms?: string;

  @IsString()
  treatment?: string;

  @IsNumber()
  patientId?: number;
}
