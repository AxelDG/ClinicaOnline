import { IsNumberString, IsString } from "@nestjs/class-validator";

export class CreatePacienteDto {

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsNumberString()
  birthdate: number;

  @IsNumberString()
  dni: number; 
}
