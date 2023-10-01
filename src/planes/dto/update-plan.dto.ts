import { IsNumber, IsString } from "@nestjs/class-validator";

export class UpdatePlanDto {

  @IsString()
  type?: string;

  @IsNumber()
  price?: number;
}
