import { Module } from '@nestjs/common';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico.entity';
import { Hospital } from 'src/hospitales/hospital.entity';
import { User } from 'src/user/user.entity';
import { Paciente } from 'src/pacientes/paciente.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Medico, Hospital, User, Paciente])],
  controllers: [MedicosController],
  providers: [MedicosService, JwtService],
})
export class MedicoModule {}
