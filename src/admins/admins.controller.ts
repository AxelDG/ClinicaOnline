import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admins.dto';
import { UpdateAdminDto } from './dto/update-admins.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('admins')
// @Auth(Role.superadmin)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  getAdmins(): Promise<Admin[]> {
    return this.adminsService.getAdmins();
  }

  @Get(':id')
  getAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.getAdmin(id);
  }

  @Post()
  createAdmin(@Body() newAdmin: CreateAdminDto) {
    return this.adminsService.createAdmin(newAdmin);
  }

  @Delete(':id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.deleteAdmin(id);
  }

  @Put(':id')
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    admin: UpdateAdminDto,
  ) {
    return this.adminsService.updateAdmin(id, admin);
  }
}
