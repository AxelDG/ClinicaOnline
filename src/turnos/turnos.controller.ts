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
@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  // @Auth(Role.medic)
  getTurnos(): Promise<Turno[]> {
    return this.turnosService.getTurnos();
  }

  @Get('/info')
  // @Auth(Role.medic)
  getTurnosInfo(): Promise<Turno[]> {
    return this.turnosService.getTurnosInfo();
  }

  @Get('user-id/:id')
  getTurnosByMedicId(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.getTurnosByUserId(id);
  }

  @Get(':id')
  // @Auth(Role.medic)
  getTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.getTurno(id);
  }

  @Post()
  // @Auth(Role.patient)
  createTurno(@Body() newTurno: CreateTurnoDto) {
    return this.turnosService.createTurno(newTurno);
  }

  @Delete(':id')
  // @Auth(Role.patient)
  deleteTurno(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.deleteTurno(id);
  }

  @Put(':id')
  // @Auth(Role.admin)
  updateTurno(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    turno: UpdateTurnoDto,
  ) {
    return this.turnosService.updateTurno(id, turno);
  }
}
