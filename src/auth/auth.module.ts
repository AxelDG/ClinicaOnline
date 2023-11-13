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
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/admin.entity';
import { Hospital } from 'src/hospitales/hospital.entity';
import { Historia } from 'src/historias/historia.entity';
import { HistoriasService } from 'src/historias/historias.service';

@Module({
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy, RefreshJwtStrategy, PacientesService, MedicosService, AdminsService, HistoriasService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, Paciente, Medico, Admin, Hospital, Historia]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
      // 10 minutos
    }),
  ],
})
export class AuthModule {}
