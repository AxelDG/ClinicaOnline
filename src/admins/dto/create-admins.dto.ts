import { IsNumber, IsString } from "@nestjs/class-validator";

export class CreateAdminDto {
  @IsString()
  adminName: string;

  @IsNumber()
  userId: number;
}
