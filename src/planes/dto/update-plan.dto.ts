import { IsString } from "@nestjs/class-validator";

export class UpdatePlanDto {

  @IsString()
  classic?: string;

  @IsString()
  family?: string;
}
