import { IsDateString, IsNumber, IsString } from "@nestjs/class-validator";

export class CreatePacienteDto {

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsDateString()
  birthdate: Date;

  @IsNumber()
  dni: number; 

  @IsNumber()
  userId: number;
}
