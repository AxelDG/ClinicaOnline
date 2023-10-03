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
import { MedicosService } from './medicos.service';
import { Medico } from './medico.entity';
import { CreateMedicoDto } from './dto/create-medicos.dto';
import { UpdateMedicoDto } from './dto/update-medicos.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('medicos')
@Auth(Role.admin)
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}
  
  @Get()
  getMedicos(): Promise<Medico[]> {
    return this.medicosService.getMedicos();
  }

  @Get(':id')
  getMedico(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.getMedico(id);
  }

  @Post()
  createMedico(@Body() newMedico: CreateMedicoDto) {
    return this.medicosService.createMedico(newMedico);
  }

  @Delete(':id')
  deleteMedico(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.deleteMedico(id);
  }

  @Put(':id')
  updateMedico(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    medico: UpdateMedicoDto,
  ) {
    return this.medicosService.updateMedico(id, medico);
  }
}
