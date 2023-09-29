import { IsNumber, IsString } from "@nestjs/class-validator";

export class UpdateMedicoDto {

  @IsString()
  medicName?: string;

  @IsString()
  medicLastname?: string;

  @IsNumber()
  registrationNumber?: number;

  @IsString()
  specialty?: string;

  @IsNumber()
  hospitalId?: number;

  @IsNumber()
  userId?: number;
}
