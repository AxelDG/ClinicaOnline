import { Module } from '@nestjs/common';
import { HospitalesController } from './hospitales.controller';
import { HospitalesService } from './hospitales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './hospital.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],
  controllers: [HospitalesController],
  providers: [HospitalesService, JwtService],
})
export class HospitalesModule {}
