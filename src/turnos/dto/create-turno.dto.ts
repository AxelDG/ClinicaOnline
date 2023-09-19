import { IsNumberString, IsString } from "@nestjs/class-validator";

export class CreateTurnoDto {

  @IsString()
  schedule: string;

  @IsNumberString()
  date: number;
}
