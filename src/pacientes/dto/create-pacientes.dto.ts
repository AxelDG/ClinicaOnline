import { IsDateString, IsNumber, IsString } from "@nestjs/class-validator";

export class CreatePacienteDto {

  @IsString()
  patientName: string;

  @IsString()
  patientLastname: string;

  @IsDateString()
  birthdate: Date;

  @IsNumber()
  dni: number; 

  @IsNumber()
  userId: number;

  @IsNumber()
  planId: number;
}
