import { IsString } from "@nestjs/class-validator";

export class UpdateAdminDto {
  @IsString()
  adminName?: string;
}
