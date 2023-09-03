import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-pacientes.dto';
import { UpdatePacienteDto } from './dto/update-pacientes.dto';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async createPaciente(paciente: CreatePacienteDto) {
    const pacienteFound = await this.pacienteRepository.findOne({
      where: {
        name: paciente.name,
      },
    });

    if (pacienteFound) {
      return new HttpException('Patient already exist', HttpStatus.CONFLICT);
    }
    const newPaciente = this.pacienteRepository.create(paciente);
    return this.pacienteRepository.save(newPaciente);
  }

  getPacientes() {
    return this.pacienteRepository.find({
      relations: [],
    });
  }

  async getPaciente(id: number) {
    const pacienteFound = await this.pacienteRepository.findOne({
      where: {
        id,
      },
      relations: [],
    });

    if (!pacienteFound) {
      return new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    return pacienteFound;
  }

  async deletePaciente(id: number) {
    const pacienteFound = await this.pacienteRepository.findOne({
      where: {
        id,
      },
    });

    if (!pacienteFound) {
      return new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    return this.pacienteRepository.delete(pacienteFound);
  }

  async updatePaciente(id: number, paciente: UpdatePacienteDto) {
    const pacienteFound = await this.pacienteRepository.findOne({
      where: {
        id,
      },
    });

    if (!pacienteFound) {
      return new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    const updatePaciente = Object.assign(pacienteFound, paciente);
    return this.pacienteRepository.save(updatePaciente);
  }
}
