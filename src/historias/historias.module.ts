import { Module } from '@nestjs/common';
import { HistoriasController } from './historias.controller';
import { HistoriasService } from './historias.service';
import { Historia } from './historia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Historia])],
  controllers: [HistoriasController],
  providers: [HistoriasService, JwtService],
})
export class HistoriasModule {}
