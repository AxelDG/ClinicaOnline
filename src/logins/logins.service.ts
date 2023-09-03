import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Login } from './login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { CredencialesDto } from './dto/create.credenciales.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Injectable()
export class LoginsService {
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    private jwtService: JwtService, // Inyectar el servicio JWT
  ) {}

  async createRegister(createLoginDto: CreateLoginDto): Promise<Login> {
    const newUser = this.loginRepository.create(createLoginDto);
    return await this.loginRepository.save(newUser);
  }

  async findEmail(email: string): Promise<Login | null> {
    return this.loginRepository.findOne({ where: { email } });
  }

  async login(credenciales: CredencialesDto): Promise<{ accessToken: string }> {
    const user = await this.findEmail(credenciales.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generar un token JWT después de la autenticación exitosa
    const payload = { sub: user.id, email: user.email }; // Puedes personalizar esto según tus necesidades
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Resto de métodos del servicio

  getLogins() {
    return this.loginRepository.find({
      relations: [],
    });
  }

  async getLogin(id: number) {
    const loginFound = await this.loginRepository.findOne({
      where: {
        id,
      },
      relations: [],
    });

    if (!loginFound) {
      return new HttpException('Login not found', HttpStatus.NOT_FOUND);
    }
    return loginFound;
  }

  async deleteLogin(id: number) {
    const loginFound = await this.loginRepository.findOne({
      where: {
        id,
      },
    });

    if (!loginFound) {
      return new HttpException('Login not found', HttpStatus.NOT_FOUND);
    }

    return this.loginRepository.remove(loginFound);
  }

  async updateLogin(id: number, login: UpdateLoginDto) {
    const loginFound = await this.loginRepository.findOne({
      where: {
        id,
      },
    });

    if (!loginFound) {
      return new HttpException('Login not found', HttpStatus.NOT_FOUND);
    }

    const updateLogin = Object.assign(loginFound, login);
    return this.loginRepository.save(updateLogin);
  }
}
