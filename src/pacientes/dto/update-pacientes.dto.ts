import { IsDateString, IsNumber, IsString } from "@nestjs/class-validator";

export class UpdatePacienteDto {

  @IsString()
  name?: string;

  @IsString()
  lastname?: string;

  @IsDateString()
  birthdate?: Date;

  @IsNumber()
  dni?: number; 

  @IsNumber()
  userId?: number;

  @IsNumber()
  planId?: number;
}
