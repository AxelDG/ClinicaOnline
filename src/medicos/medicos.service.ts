import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';
import { CreateMedicoDto } from './dto/create-medicos.dto';
import { UpdateMedicoDto } from './dto/update-medicos.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
  ) {}

  async createMedico(medico: CreateMedicoDto) {
    const userFound = await this.medicoRepository.findOne({
      where: {
        id: medico.userId
      },
    });

    if (userFound) {
      return new HttpException('Medic already exist', HttpStatus.CONFLICT);
    }
    const newMedico = this.medicoRepository.create(medico);
    
    return this.medicoRepository.save(newMedico);
  }

  getMedicos() {
    return this.medicoRepository.find({
      relations: ['pacientes'],
    });
  }

  async getMedico(id: number) {
    const medicoFound = await this.medicoRepository.findOne({
      where: {
        id,
      },
      relations: ['pacientes'],
    });

    if (!medicoFound) {
      return new HttpException('Medic not found', HttpStatus.NOT_FOUND);
    }
    return medicoFound;
  }

  async getMedicByUser(id: number) {
    const medicFound = await this.medicoRepository.findOne({
      where: {userId: id}
    })

    if (!medicFound) {
      return new HttpException('User Medic not found', HttpStatus.NOT_FOUND)
    }
    return medicFound
  }

  async deleteMedico(id: number) {
    const deleteResult = await this.medicoRepository.delete(id);
  
    if (deleteResult.affected === 0) {
      return new HttpException('Medic not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateMedico(id: number, medico: UpdateMedicoDto) {
    const medicoFound = await this.medicoRepository.findOne({
      where: {
        id,
      },
    });

    if (!medicoFound) {
      return new HttpException('Medic not found', HttpStatus.NOT_FOUND);
    }

    const updateMedico = Object.assign(medicoFound, medico);
    return this.medicoRepository.save(updateMedico);
  }
}
