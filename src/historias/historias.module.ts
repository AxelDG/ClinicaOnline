import { Module } from '@nestjs/common';
import { HistoriasController } from './historias.controller';
import { HistoriasService } from './historias.service';
import { Historia } from './historia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Historia])],
  controllers: [HistoriasController],
  providers: [HistoriasService],
})
export class HistoriasModule {}
