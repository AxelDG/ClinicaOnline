import { IsDateString, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class UpdateHistoriaDto {

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @IsNumber()
  patientId?: number;
}
