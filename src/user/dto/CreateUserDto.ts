import { IsEmail, IsString } from "@nestjs/class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { Role } from "src/common/enums/rol.enum";

export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role?: Role;
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}