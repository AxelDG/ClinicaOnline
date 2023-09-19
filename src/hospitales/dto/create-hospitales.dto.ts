import { IsString } from "@nestjs/class-validator";

export class CreateHospitalDto {
  @IsString()
  hospitalName: string;

  @IsString()
  hospitalAdress: string;
}
