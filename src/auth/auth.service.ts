import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { RegisterPatientDto } from './dto/registerPatient.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/common/enums/rol.enum';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { MedicosService } from 'src/medicos/medicos.service';
import { RegisterMedicDto } from './dto/registerMedic.dto';
import { RegisterAdminDto } from './dto/registerAdmin.dto';
import { AdminsService } from 'src/admins/admins.service';
import { UpdateUserDto } from 'src/user/dto/CreateUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private pacienteService: PacientesService,
    private medicoService: MedicosService,
    private adminService: AdminsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.query(`
      SELECT
        user.*,
        pacientes.id as patientId,
        pacientes.patientName,
        pacientes.patientLastname,
        pacientes.birthdate,
        pacientes.dni,
        pacientes.planId,
        planes.type,
        planes.id
      FROM
        user
      JOIN
        pacientes ON pacientes.userId = user.id
      JOIN
        planes ON planes.id = pacientes.planId
      WHERE
        user.id = ${id}
    `);

    return user;
  }

  async findUserMedic(id: number): Promise<User> {
    const user = await this.userRepository.query(`
      SELECT
        user.*,
        medicos.id as medicId,
        medicos.medicName,
        medicos.medicLastname
      FROM
        user
      JOIN
        medicos ON medicos.userId = user.id
      WHERE
        user.id = ${id}
    `);

    return user;
  }

  async registerPatient({ name, lastname, birthdate, dni, planId, email, password }: RegisterPatientDto) {
    const user = await this.userService.findOneWithUserName(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const patientUser = await this.userService.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: Role.patient
    })

    await this.pacienteService.createPaciente({
      patientName: name,
      patientLastname: lastname,
      birthdate: birthdate,
      dni: dni,
      planId: planId,
      userId: patientUser.id
    })

    await this.pacienteService.addPatientToHospital(patientUser.id, 1)

    return {
      name,
      email,
    };
  }

  async registerMedic({ name, lastname, specialty, registrationNumber, email, password, startTime, endTime, workingDays }: RegisterMedicDto) {
    const user = await this.userService.findOneWithUserName(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const medicUser = await this.userService.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: Role.medic
    });

    await this.medicoService.createMedico({
      medicName: name,
      medicLastname: lastname,
      specialty: specialty,
      registrationNumber: registrationNumber,
      hospitalId: 1,
      userId: medicUser.id,
      startTime: startTime,
      endTime: endTime,
      workingDays: workingDays
    })

    return {
      name,
      email,
    };
  }

  async registerAdmin({ name, email, password }: RegisterAdminDto) {
    const user = await this.userService.findOneWithUserName(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const adminUser = await this.userService.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: Role.admin

    });

    await this.adminService.createAdmin({
      adminName: name,
      userId: adminUser.id,
      hospitalId: 1
    })

    return {
      name,
      email,
    };
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }
  

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      name : user.name,
      role: user.role,
      email,
      token,
      id: user.id
    };
    
  }
  

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async deleteUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return this.userRepository.delete({id: userFound.id})
  }
}
