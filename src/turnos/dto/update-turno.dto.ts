import { IsString } from "@nestjs/class-validator";

export class UpdateTurnoDto {

  @IsString()
  schedule: string;

  @IsString()
  date: string;
}
