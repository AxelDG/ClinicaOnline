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

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }
}
