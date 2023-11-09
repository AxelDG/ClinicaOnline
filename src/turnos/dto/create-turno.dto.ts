import { IsDateString, IsNumber } from '@nestjs/class-validator';
import { DateTime } from 'luxon';

export class CreateTurnoDto {
  @IsNumber()
  medicId: number;

  @IsNumber()
  patientId: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
