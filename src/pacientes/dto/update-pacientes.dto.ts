import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class UpdatePacienteDto {
  @IsOptional()
  @IsString()
  patientName?: string;

  @IsOptional()
  @IsString()
  patientLastname?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsNumber()
  dni?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  planId?: number;
}
