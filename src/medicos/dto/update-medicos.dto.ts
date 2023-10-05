import { IsNumber, IsString } from "@nestjs/class-validator";
import { Specialty } from "src/common/enums/specialty.enum";

export class UpdateMedicoDto {

  @IsString()
  medicName?: string;

  @IsString()
  medicLastname?: string;

  @IsNumber()
  registrationNumber?: number;

  @IsString()
  specialty?: Specialty

  @IsNumber()
  hospitalId?: number;

  @IsNumber()
  userId?: number;
}
