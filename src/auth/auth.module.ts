import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { jwtConstants } from './constants/jwt.constant';
import { Paciente } from 'src/pacientes/paciente.entity';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { Medico } from 'src/medicos/medico.entity';
import { MedicosService } from 'src/medicos/medicos.service';

@Module({
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy, RefreshJwtStrategy, PacientesService, MedicosService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, Paciente, Medico]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
      //Expira en un minuto
      //al pasar el minuto tendra que volverse a logear para acceder
    }),
  ],
})
export class AuthModule {}
