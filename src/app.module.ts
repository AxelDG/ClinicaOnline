import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HospitalesModule } from './hospitales/hospitales.module';
import { MedicoModule } from './medicos/medicos.module';
import { AdminsModule } from './admins/admins.module';
import { HistoriasModule } from './historias/historias.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { TurnosModule } from './turnos/turnos.module';
import { PlanesModule } from './planes/planes.module';
import { ArticlesModule } from './articles/articles.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0416378',
      database: 'clinica',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    HospitalesModule,
    MedicoModule,
    AdminsModule,
    HistoriasModule,
    PacientesModule,
    TurnosModule,
    PlanesModule,
    ArticlesModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
