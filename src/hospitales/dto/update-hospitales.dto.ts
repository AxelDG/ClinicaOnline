import { IsString } from "@nestjs/class-validator";

export class UpdateHospitalDto {
  @IsString()
  hospitalName?: string;

  @IsString()
  hospitalAdress?: string;
}
