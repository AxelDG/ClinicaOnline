import { IsNumberString, IsString } from "@nestjs/class-validator";

export class UpdateTurnoDto {

  @IsString()
  schedule: string;

  @IsNumberString()
  date: number;
}
