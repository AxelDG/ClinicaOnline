import { IsNumber, IsString } from "@nestjs/class-validator";
import { Optional } from "@nestjs/common";

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

  @IsNumber()
  userId: number;
}
