import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-pacientes.dto';
import { UpdatePacienteDto } from './dto/update-pacientes.dto';
import { DataSource, Repository } from 'typeorm';
import { Hospital } from 'src/hospitales/hospital.entity';
import { HistoriasService } from 'src/historias/historias.service';

@Injectable()
export class PacientesService {
  constructor(
    private readonly dataSource: DataSource,
    private historiaService: HistoriasService,

    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,

    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}

  async createPaciente({patientName, patientLastname, birthdate, dni, userId, planId }: CreatePacienteDto) {
    const userFound = await this.pacienteRepository.findOne({
      where: {
        patientName: patientName
      },
    });

    if (userFound) {
      return new HttpException('Patient already exist', HttpStatus.CONFLICT);
    }
    const newPaciente = this.pacienteRepository.create({
      patientName,
      patientLastname,
      birthdate,
      dni,
      userId,
      planId
    });

    await this.pacienteRepository.save(newPaciente);

    await this.historiaService.createHistoria({
      date: null,
      symptoms: null,
      treatment: null,
      patientId: newPaciente.id
    })
    return newPaciente
  }

  async addPatientToHospital(patient: number, hospital: number) {
    const patientFound = await this.pacienteRepository.findOne({
      where: {
        id: patient,
      },
    });

    const hospitalFound = await this.hospitalRepository.findOne({
      where: {
        id: hospital,
      },
    });
    if (!patientFound || !hospitalFound) {
      return new HttpException(
        "Patient or hospital don't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('hospitales_pacientes_pacientes')
      .values({ pacientesId: patientFound.id, hospitalesId: hospitalFound.id })
      .execute();
  }

  getPacientes() {
    return this.pacienteRepository.find();
  }

  async getPaciente(id: number) {
    const pacienteFound = await this.pacienteRepository.findOne({
      where: {
        id
      },
      
    });

    if (!pacienteFound) {
      return new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    return pacienteFound;
  }

  async getPatientByUser(id: number) {
    const patientFound = await this.pacienteRepository.findOne({
      where: {userId: id}
    })

    if (!patientFound) {
      return new HttpException('User Patient not found', HttpStatus.NOT_FOUND)
    }
    return patientFound
  }


  async deletePaciente(id: number) {
    const pacienteFound = await this.pacienteRepository.findOne({where: {id}});

    if (!pacienteFound) {
      return new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    return this.pacienteRepository.delete({id: pacienteFound.id});
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
