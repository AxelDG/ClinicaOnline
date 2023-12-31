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
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-pacientes.dto';
import { UpdatePacienteDto } from './dto/update-pacientes.dto';
import { PacientesService } from './pacientes.service';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('pacientes')
// @Auth(Role.admin)
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  getPacientes(): Promise<Paciente[]> {
    return this.pacientesService.getPacientes();
  }

  @Get(':id')
  getPaciente(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.getPaciente(id);
  }

  @Get('usuario/:id')
  getPatientByUser(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.getPatientByUser(id);
  }

  @Post()
  createPaciente(@Body() newPaciente: CreatePacienteDto) {
    return this.pacientesService.createPaciente(newPaciente);
  }

  @Delete(':id')
  deletePaciente(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.deletePaciente(id);
  }

  @Put(':id')
  updatePacinte(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    paciente: UpdatePacienteDto,
  ) {
    return this.pacientesService.updatePaciente(id, paciente);
  }
}
