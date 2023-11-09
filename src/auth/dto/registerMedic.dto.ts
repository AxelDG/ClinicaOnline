import { IsDate, IsMilitaryTime } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
import { DateTime } from 'luxon';
import { Specialty } from 'src/common/enums/specialty.enum';

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
  specialty: Specialty;

  @IsNumber()
  registrationNumber: number;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsMilitaryTime()
  startTime: DateTime;

  @IsMilitaryTime()
  endTime: DateTime;
}
