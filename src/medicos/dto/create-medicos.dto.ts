import { IsString } from "@nestjs/class-validator";

export class CreateMedicoDto {

  @IsString()
  medicName: string;

  @IsString()
  medicLastname: string;

  @IsString()
  registrationNumber: string;

  @IsString()
  specialty: string;
}
