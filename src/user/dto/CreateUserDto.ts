import { IsEmail, IsString } from "@nestjs/class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}