import { IsDateString, IsString } from "@nestjs/class-validator";

export class CreateTurnoDto {

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsDateString()
  date: Date;
}
