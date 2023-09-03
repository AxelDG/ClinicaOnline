import { Module } from '@nestjs/common';
import { PlanesController } from './planes.controller';
import { PlanesService } from './planes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanesController],
  providers: [PlanesService],
})
export class PlanesModule {}
