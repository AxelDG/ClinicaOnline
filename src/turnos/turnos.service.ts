import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateTurnoDto } from './dto/create-turno.dto';
import { UpdateTurnoDto } from './dto/update-turno.dto';
import { Medico } from 'src/medicos/medico.entity';
import { Paciente } from 'src/pacientes/paciente.entity';

@Injectable()
export class TurnosService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,

    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,

    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async createTurno(turno: CreateTurnoDto) {
    const existingTurno = await this.turnoRepository.findOne({
      where: {
        patientId: turno.patientId,
        medicId: turno.medicId,
      },
    });
    if (existingTurno) {
      const updateTurno = Object.assign(existingTurno, turno);
      await this.turnoRepository.save(updateTurno);
      return updateTurno;
    } else {
      const newTurno = this.turnoRepository.create(turno);
      await this.turnoRepository.save(newTurno);
      await this.addPatientToDoctor(newTurno.patientId, newTurno.medicId);
      return newTurno;
    }
  }

  async addPatientToDoctor(patient: number, doctor: number) {
    const patientFound = await this.pacienteRepository.findOne({
      where: { id: patient },
    });
    const doctorFound = await this.medicoRepository.findOne({
      where: { id: doctor },
    });
    if (!patientFound || !doctorFound) {
      return new HttpException(
        "Patient or doctor don't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('pacientes_medicos_medicos')
      .values({ pacientesId: patientFound.id, medicosId: doctorFound.id })
      .execute();
  }

  getTurnos() {
    return this.turnoRepository.find({
      relations: [],
    });
  }

  async getTurnosInfo(): Promise<Turno[]> {
    const turnos = await this.turnoRepository.query(`
      SELECT
        turnos.id,
        turnos.startDate,
        turnos.endDate,
        medicos.medicName,
        medicos.specialty,
        pacientes.patientName
      FROM
        turnos
      JOIN
        medicos ON medicos.id = turnos.medicId
      JOIN
        pacientes ON pacientes.id = turnos.patientId
    `);

    return turnos;
  }

  async getTurnosByUserId(userId: number): Promise<Turno[]> {
    const turnos = await this.turnoRepository.query(`
  SELECT
    turnos.id,
    turnos.startDate,
    turnos.endDate,
    medicos.medicName,
    medicos.specialty,
    pacientes.patientName
  FROM
    turnos
  JOIN
    medicos ON medicos.id = turnos.medicId
  JOIN
    pacientes ON pacientes.id = turnos.patientId
  JOIN
    user ON user.id = medicos.userId  
  WHERE
    user.id = ${userId}
    AND turnos.startDate >= CURDATE() - INTERVAL (WEEKDAY(CURDATE()) + 1) DAY
    AND turnos.startDate < CURDATE() - INTERVAL (WEEKDAY(CURDATE()) + 1 - 7) DAY;
    `);

    return turnos;
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
    return this.turnoRepository.delete({ id: turnoFound.id });
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
