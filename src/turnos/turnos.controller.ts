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
import { Turno } from './turno.entity';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { TurnosService } from './turnos.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@ApiTags('turnos')
@Auth(Role.patient)
@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  getTurnos(): Promise<Turno[]> {
    return this.turnosService.getTurnos();
  }

  @Get(':id')
  getTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.getTurno(id);
  }

  @Post()
  createTurno(@Body() newTurno: CreateTurnoDto) {
    return this.turnosService.createTurno(newTurno);
  }

  @Delete(':id')
  deleteTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.deleteTurno(id);
  }

  @Put(':id')
  updateTurno(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    turno: UpdateTurnoDto,
  ) {
    return this.turnosService.updateTurno(id, turno);
  }
}
