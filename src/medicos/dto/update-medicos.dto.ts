import { IsString } from "@nestjs/class-validator";

export class UpdateMedicoDto {

  @IsString()
  medicName?: string;

  @IsString()
  medicLastname?: string;

  @IsString()
  registrationNumber?: string;

  @IsString()
  specialty?: string;
}
