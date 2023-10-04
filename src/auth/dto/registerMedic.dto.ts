import { IsDateString, IsNumber, IsOptional } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterMedicDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  specialty: string;

  @IsNumber()
  registrationNumber: number;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

}
