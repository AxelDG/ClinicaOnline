import { IsString } from "@nestjs/class-validator";

export class CreatePlanDto {

  @IsString()
  classic: string;

  @IsString()
  family: string;
}
