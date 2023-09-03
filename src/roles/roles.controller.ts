import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dt';
import { UpdateRolDto } from './dto/update-rol.dt';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRol(@Body() createRolDto: CreateRolDto) {
    return this.rolesService.createRol(createRolDto);
  }

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Get(':id')
  getRol(@Param('id', ParseIntPipe) id: number)  {
    return this.rolesService.getRol(id);
  }

  @Put(':id')
  updateRol(@Param('id', ParseIntPipe) id: number, @Body() updateRolDto: UpdateRolDto) {
    return this.rolesService.updateRol(id, updateRolDto);
  }

  @Delete(':id')
  deleteRol(@Param('id', ParseIntPipe) id: number)  {
    return this.rolesService.deleteRol(id);
  }
}
