import { IsNumberString, IsString } from "@nestjs/class-validator";

export class UpdatePacienteDto {

  @IsString()
  name?: string;

  @IsString()
  lastname?: string;

  @IsNumberString()
  birthdate?: number;

  @IsNumberString()
  dni?: number; 
}
