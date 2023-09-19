import { IsString } from "@nestjs/class-validator";

export class UpdateHistoriaDto {

  @IsString()
  patientname?: string;

  @IsString()
  date?: string;

  @IsString()
  symptoms?: string;

  @IsString()
  treatment?: string;
}
