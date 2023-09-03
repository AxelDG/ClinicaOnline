import { Module } from '@nestjs/common';
import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './turno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  controllers: [TurnosController],
  providers: [TurnosService],
})
export class TurnosModule {}
