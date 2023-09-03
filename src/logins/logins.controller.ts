import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateLoginDto } from './dto/update-login.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { CredencialesDto } from './dto/create.credenciales.dto';
import { LoginsService } from './logins.service';
import { Login } from './login.entity';

@Controller('logins')
export class LoginsController {
  constructor(private readonly loginsService: LoginsService) {}

  @Get()
  getLogins(): Promise<Login[]> {
    return this.loginsService.getLogins();
  }

  @Get(':id')
  getLogin(@Param('id', ParseIntPipe) id: number) {
    return this.loginsService.getLogin(id);
  }

  @Delete(':id')
  deleteLogin(@Param('id', ParseIntPipe) id: number) {
    return this.loginsService.deleteLogin(id);
  }

  @Put(':id')
  updateLogin(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    login: UpdateLoginDto,
  ) {
    return this.loginsService.updateLogin(id, login);
  }

  @Post()
  async createRegister(@Body() createLoginDto: CreateLoginDto) {
    try {
      //console.log('Creando nuevo usuario con los datos:', createLoginDto);

      const newUser = await this.loginsService.createRegister(createLoginDto);
      return newUser;
    } catch (error) {
      //console.error('Error al crear el usuario:', error);
      throw new Error('Error creating user');
    }
  }

  @Post('login')
  async createLogin(@Body() credenciales: CredencialesDto) {
    try {
      const login = await this.loginsService.findEmail(credenciales.email);

      if (!login) {
        throw new UnauthorizedException('Correo electrónico no registrado');
      }

      // Comparar la contraseña ingresada con la contraseña almacenada
      if (credenciales.password !== login.password) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }

      if (login.type !== 'Alumno' && login.type !== 'Profesor') {
        throw new UnauthorizedException('Tipo de usuario no válido');
      }

      // Redirigir a diferentes rutas según el tipo de usuario
      if (login.type === 'Alumno' || login.type === 'Profesor') {
        return {
          type: login.type,
          name: login.name,
        };
      }
    } catch (error) {
      throw new UnauthorizedException('Error al iniciar sesión');
    }
  }
}
