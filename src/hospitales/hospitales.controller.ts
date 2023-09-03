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
import { HospitalesService } from './hospitales.service';
import { Hospital } from './hospital.entity';
import { UpdateHospitalDto } from './dto/update-hospitales.dto';
import { CreateHospitalDto } from './dto/create-hospitales.dto';

@Controller('hospitales')
export class HospitalesController {
  constructor(private readonly hospitalesService: HospitalesService) {}

  @Get()
  getHospitales(): Promise<Hospital[]> {
    return this.hospitalesService.getHospitales();
  }

  @Get(':id')
  getHospital(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalesService.getHospital(id);
  }

  @Post()
  createHospital(@Body() newHospital: CreateHospitalDto) {
    return this.hospitalesService.createHospital(newHospital);
  }

  @Delete(':id')
  deleteHospital(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalesService.deleteHospital(id);
  }

  @Put(':id')
  updateHospital(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    hospital: UpdateHospitalDto,
  ) {
    return this.hospitalesService.updateHospital(id, hospital);
  }
}
