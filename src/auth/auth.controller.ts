import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RegisterPatientDto } from './dto/registerPatient.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { RegisterMedicDto } from './dto/registerMedic.dto';
import { RegisterAdminDto } from './dto/registerAdmin.dto';
import { UpdateUserDto } from 'src/user/dto/CreateUserDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get('users')
  // @Auth(Role.admin)
  async findUsers() {
    return await this.userRepository.find();
  }

  @Get('users/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.findUser(id)
  }

  @Get('userMedic/:id')
  async findUserMedic(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.findUserMedic(id)
  }

  @Post('register/patient')
  async registerPatient(@Body() registerPatientDto: RegisterPatientDto) {
    return await this.authService.registerPatient(registerPatientDto);
  }

  @Post('register/medic')
  // @Auth(Role.admin)
  async registerMedic(@Body() registerMedicDto: RegisterMedicDto) {
    return await this.authService.registerMedic(registerMedicDto);
  }

  @Post('register/admin')
  // @Auth(Role.superadmin)
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    return await this.authService.registerAdmin(registerAdminDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Delete(':id')
  // @Auth(Role.admin)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.deleteUser(id)
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    user: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, user);
  }


  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user)
  }
}
