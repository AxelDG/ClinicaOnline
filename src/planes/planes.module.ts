import { Module } from '@nestjs/common';
import { PlanesController } from './planes.controller';
import { PlanesService } from './planes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { Hospital } from 'src/hospitales/hospital.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Hospital])],
  controllers: [PlanesController],
  providers: [PlanesService],
})
export class PlanesModule {}
