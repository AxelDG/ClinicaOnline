import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { HistoriasService } from './historias.service';
import { Historia } from './historia.entity';
import { CreateHistoriaDto } from './dto/create-historia.dto';
import { UpdateHistoriaDto } from './dto/update-historia.dto';

@Controller('historias')
export class HistoriasController {
  constructor(private readonly historiasService: HistoriasService) {}

  @Get()
  getHistorias(): Promise<Historia[]> {
    return this.historiasService.getHistorias();
  }

  @Get(':id')
  getHistoria(@Param('id', ParseIntPipe) id: number) {
    return this.historiasService.getHistoria(id);
  }

  @Post()
  createHistoia(@Body() newHistoria: CreateHistoriaDto) {
    return this.historiasService.createHistoria(newHistoria);
  }

  @Delete(':id')
  deleteHistoria(@Param('id', ParseIntPipe) id: number) {
    return this.historiasService.deleteHistoria(id);
  }

  @Put(':id')
  updateHistoria(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    historia: UpdateHistoriaDto,
  ) {
    return this.historiasService.updateHistoria(id, historia);
  }
}