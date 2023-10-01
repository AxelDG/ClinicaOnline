import { IsNumber, IsString } from "@nestjs/class-validator";

export class CreatePlanDto {

  @IsString()
  type: string;

  @IsNumber()
  price: number;
}
