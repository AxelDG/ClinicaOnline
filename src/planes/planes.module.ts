import { Module } from '@nestjs/common';
import { PlanesController } from './planes.controller';
import { PlanesService } from './planes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { Hospital } from 'src/hospitales/hospital.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Hospital])],
  controllers: [PlanesController],
  providers: [PlanesService, JwtService],
})
export class PlanesModule {}
