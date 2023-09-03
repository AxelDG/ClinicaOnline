import { Module } from '@nestjs/common';
import { LoginsController } from './logins.controller';
import { LoginsService } from './logins.service';
import { Login } from './login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Login]),
  JwtModule.register({secret: 'secret'}),
],
  controllers: [LoginsController],
  providers: [LoginsService],
})
export class LoginsModule {}
