import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';
import { Paciente } from './paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Hospital } from 'src/hospitales/hospital.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente, User, Hospital])],
  controllers: [PacientesController],
  providers: [PacientesService, JwtService],
  exports: [PacientesService]
})
export class PacientesModule {}
