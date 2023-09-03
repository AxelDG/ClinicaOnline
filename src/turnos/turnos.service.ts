import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { Repository } from 'typeorm';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
  ) {}

  async createTurno(turno: CreateTurnoDto) {
    const turnoFound = await this.turnoRepository.findOne({
      where: {
        //schedule: turno.schedule,
      },
    });

    if (turnoFound) {
      return new HttpException('Shift already exist', HttpStatus.CONFLICT);
    }
    const newTurno = this.turnoRepository.create(turno);
    return this.turnoRepository.save(newTurno);
  }

  getTurnos() {
    return this.turnoRepository.find({
      relations: [],
    });
  }

  async getTurno(id: number) {
    const turnoFound = await this.turnoRepository.findOne({
      where: {
        id,
      },
      relations: [],
    });

    if (!turnoFound) {
      return new HttpException('Shift not found', HttpStatus.NOT_FOUND);
    }
    return turnoFound;
  }

  async deleteTurno(id: number) {
    const turnoFound = await this.turnoRepository.findOne({
      where: {
        id,
      },
    });

    if (!turnoFound) {
      return new HttpException('Shift not found', HttpStatus.NOT_FOUND);
    }
    return this.turnoRepository.delete(turnoFound);
  }

  async updateTurno(id: number, turno: UpdateTurnoDto) {
    const turnoFound = await this.turnoRepository.findOne({
      where: {
        id,
      },
    });

    if (!turnoFound) {
      return new HttpException('Shift not found', HttpStatus.NOT_FOUND);
    }

    const updateTurno = Object.assign(turnoFound, turno);
    return this.turnoRepository.save(updateTurno);
  }
}
