import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerPatient({ name, email, password }: RegisterDto) {
    const user = await this.userService.findOneWithUserName(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: Role.patient
    });

    return {
      name,
      email,
    };
  }

  async registerMedic({ name, email, password }: RegisterDto) {
    const user = await this.userService.findOneWithUserName(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: Role.medic
    });

    return {
      name,
      email,
    };
  }
  // async register({ name, email, password }: RegisterDto) {
  //   const user = await this.userService.findOneWithUserName(name);

  //   if (user) {
  //     throw new BadRequestException('User already exists');
  //   }

  //   await this.userService.create({
  //     name,
  //     email,
  //     password: await bcrypt.hash(password, 10),
  //   });

  //   return {
  //     name,
  //     email,
  //   };
  // }

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
      email,
      token,
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
