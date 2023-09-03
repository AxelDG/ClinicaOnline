import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateRolDto } from './dto/update-rol.dt';
import { CreateRolDto } from './dto/create-rol.dt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async createRol(rol: CreateRolDto) {
    const rolFound = await this.rolRepository.findOne({
      where: {
        id: rol.id,
      },
    });

    if (rolFound) {
      return new HttpException('Rol already exist', HttpStatus.CONFLICT);
    }
    const newRol = this.rolRepository.create(rol);
    return this.rolRepository.save(newRol);
  }

  getRoles() {
    return this.rolRepository.find({
      relations: [],
    });
  }

  async getRol(id: number) {
    const rolFound = await this.rolRepository.findOne({
      where: {
        id,
      },
      relations: [],
    });

    if (!rolFound) {
      return new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }
    return rolFound;
  }

  async deleteRol(id: number) {
    const rolFound = await this.rolRepository.findOne({
      where: {
        id,
      },
    });

    if (!rolFound) {
      return new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }
    return this.rolRepository.delete(rolFound);
  }

  async updateRol(id: number, rol: UpdateRolDto) {
    const rolFound = await this.rolRepository.findOne({
      where: {
        id,
      },
    });

    if (!rolFound) {
      return new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }

    const updateRol = Object.assign(rolFound, rol);
    return this.rolRepository.save(updateRol);
  }
}
