import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './hospital.entity';
import { UpdateHospitalDto } from './dto/update-hospitales.dto';
import { CreateHospitalDto } from './dto/create-hospitales.dto';

@Injectable()
export class HospitalesService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}

  async createHospital(hospital: CreateHospitalDto) {
    const hospitalFound = await this.hospitalRepository.findOne({
      where: {
        hospitalName: hospital.hospitalName,
      },
    });

    if (hospitalFound) {
      return new HttpException('Hospital already exist', HttpStatus.CONFLICT);
    }
    const newHospital = this.hospitalRepository.create(hospital);
    return this.hospitalRepository.save(newHospital);
  }

  getHospitales() {
    return this.hospitalRepository.find({
      relations: [],
    });
  }

  async getHospital(id: number) {
    const hospitalFound = await this.hospitalRepository.findOne({
      where: {
        id,
      },
      relations: [],
    });

    if (!hospitalFound) {
      return new HttpException('Hospital not found', HttpStatus.NOT_FOUND);
    }
    return hospitalFound;
  }

  async deleteHospital(id: number) {
    const hospitalFound = await this.hospitalRepository.findOne({
      where: {
        id,
      },
    });

    if (!hospitalFound) {
      return new HttpException('Hospital not found', HttpStatus.NOT_FOUND);
    }
    return this.hospitalRepository.delete(hospitalFound);
  }

  async updateHospital(id: number, hospital: UpdateHospitalDto) {
    const hospitalFound = await this.hospitalRepository.findOne({
      where: {
        id,
      },
    });

    if (!hospitalFound) {
      return new HttpException('Hospital not found', HttpStatus.NOT_FOUND);
    }

    const updateHospital = Object.assign(hospitalFound, hospital);
    return this.hospitalRepository.save(updateHospital);
  }
}
