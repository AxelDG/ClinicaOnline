import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Historia } from './historia.entity';
import { Repository } from 'typeorm';
import { CreateHistoriaDto } from './dto/create-historia.dto';
import { UpdateHistoriaDto } from './dto/update-historia.dto';

@Injectable()
export class HistoriasService {
  constructor(
    @InjectRepository(Historia)
    private historiaRepository: Repository<Historia>,
  ) {}

  async createHistoria(historia: CreateHistoriaDto) {
    const historiaFound = await this.historiaRepository.findOne({
      where: {
        patientName: historia.patientName,
      },
    });

    if (historiaFound) {
      return new HttpException('Clinic history already exist', HttpStatus.CONFLICT);
    }
    const newHistoria = this.historiaRepository.create(historia);
    return this.historiaRepository.save(newHistoria);
  }

  getHistorias() {
    return this.historiaRepository.find({
      relations: [],
    });
  }

  async getHistoria(id: number) {
    const historiaFound = await this.historiaRepository.findOne({
      where: {
        id,
      },
      relations: [],
    });

    if (!historiaFound) {
      return new HttpException('Clinic history not found', HttpStatus.NOT_FOUND);
    }
    return historiaFound;
  }

  async deleteHistoria(id: number) {
    const historiaFound = await this.historiaRepository.findOne({where: {
      id
    }});

    if (!historiaFound) {
      return new HttpException('Clinic history not found', HttpStatus.NOT_FOUND);
    }
    return this.historiaRepository.delete({id: historiaFound.id});
  }

  async updateHistoria(id: number, historia: UpdateHistoriaDto) {
    const historiaFound = await this.historiaRepository.findOne({
      where: {
        id,
      },
    });

    if (!historiaFound) {
      return new HttpException('Clinic history not found', HttpStatus.NOT_FOUND);
    }

    const updateHistoria = Object.assign(historiaFound, historia);
    return this.historiaRepository.save(updateHistoria);
  }
}
