import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get('users')
  async findUsers() {
    return await this.userRepository.find();
  }

  @Post('register/patient')
  async registerPatient(@Body() registerDto: RegisterDto) {
    return await this.authService.registerPatient(registerDto);
  }

  @Post('register/medic')
  async registerMedic(@Body() registerDto: RegisterDto) {
    return await this.authService.registerMedic(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Delete(':id')
  @Auth(Role.admin)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.deleteUser(id)
  }


  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user)
  }
}
