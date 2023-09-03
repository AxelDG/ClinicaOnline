import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesModule } from './pacientes/pacientes.module';
import { HospitalesModule } from './hospitales/hospitales.module';
import { PlanesModule } from './planes/planes.module';
import { TurnosModule } from './turnos/turnos.module';
import { HistoriasModule } from './historias/historias.module';
import { LoginsModule } from './logins/logins.module';
import { HistoriasController } from './historias/historias.controller';
import { MedicoModule } from './medicos/medicos.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'clinica',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MedicoModule,
    PacientesModule,
    HospitalesModule,
    PlanesModule,
    TurnosModule,
    HistoriasModule,
    LoginsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
