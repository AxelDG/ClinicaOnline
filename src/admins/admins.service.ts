import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admins.dto';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from './dto/update-admins.dto';
import { Admin } from './admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async createAdmin(admin: CreateAdminDto) {
    const adminFound = await this.adminRepository.findOne({
      where: {
        adminName: admin.adminName,
      },
    });

    if (adminFound) {
      return new HttpException('Admin already exist', HttpStatus.CONFLICT);
    }
    const newAdmin = this.adminRepository.create(admin);
    return this.adminRepository.save(newAdmin);
  }

  getAdmins() {
    return this.adminRepository.find({
      relations: [],
    });
  }

  async getAdmin(id: number) {
    const adminFound = await this.adminRepository.findOne({
      where: {
        id,
      },
      relations: [],
    });

    if (!adminFound) {
      return new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return adminFound;
  }

  async deleteAdmin(id: number) {
    const adminFound = await this.adminRepository.findOne({
      where: {
        id,
      },
    });

    if (!adminFound) {
      return new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return this.adminRepository.delete({ id: adminFound.id });
  }

  async updateAdmin(id: number, admin: UpdateAdminDto) {
    const adminFound = await this.adminRepository.findOne({
      where: {
        id,
      },
    });

    if (!adminFound) {
      return new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    const updateAdmin = Object.assign(adminFound, admin);
    return this.adminRepository.save(updateAdmin);
  }
}
