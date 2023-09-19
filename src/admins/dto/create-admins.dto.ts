import { IsString } from "@nestjs/class-validator";

export class CreateAdminDto {
  @IsString()
  adminName: string;
}
