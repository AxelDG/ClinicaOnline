import { Module } from '@nestjs/common';
import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { MedicosService } from 'src/medicos/medicos.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turno, Medico, Paciente, User])],
  controllers: [TurnosController],
  providers: [TurnosService, PacientesService, MedicosService],
})
export class TurnosModule {}
