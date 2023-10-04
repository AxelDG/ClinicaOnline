import { Module } from '@nestjs/common';
import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, Medico, Paciente, User])],
  controllers: [TurnosController],
  providers: [TurnosService, JwtService],
})
export class TurnosModule {}
