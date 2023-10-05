import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/CreateUserDto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepository.findOne({ where: { email: userName } });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }
}
