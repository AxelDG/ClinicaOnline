import { IsDateString, IsNumber, IsString } from "@nestjs/class-validator";

export class CreatePacienteDto {

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthdate: Date;

  @IsNumber()
  dni: number; 

  @IsNumber()
  medicId: number;
}
