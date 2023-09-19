import { IsNumber, IsString } from "@nestjs/class-validator";

export class CreateMedicoDto {

  @IsString()
  medicName: string;

  @IsString()
  medicLastname: string;

  @IsNumber()
  registrationNumber: number;

  @IsString()
  specialty: string;

  @IsNumber()
  hospitalId: number;
}
