import { IsNumber, IsString } from "@nestjs/class-validator";

export class UpdateHistoriaDto {

  @IsString()
  date?: string;

  @IsString()
  symptoms?: string;

  @IsString()
  treatment?: string;

  @IsNumber()
  patientId?: number;
}
