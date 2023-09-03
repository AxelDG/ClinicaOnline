import { Module } from '@nestjs/common';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico.entity';
import { Hospital } from 'src/hospitales/hospital.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medico, Hospital])],
  controllers: [MedicosController],
  providers: [MedicosService],
})
export class MedicoModule {}
