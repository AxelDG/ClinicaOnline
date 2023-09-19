import { IsNumber, IsString } from "@nestjs/class-validator";

export class UpdatePacienteDto {

  @IsString()
  name?: string;

  @IsString()
  lastname?: string;

  @IsNumber()
  birthdate?: number;

  @IsNumber()
  dni?: number; 
}
