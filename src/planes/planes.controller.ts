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
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanesService } from './planes.service';

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Get()
  getPlanes(): Promise<Plan[]> {
    return this.planesService.getPlanes();
  }

  @Get(':id')
  getPlan(@Param('id', ParseIntPipe) id: number) {
    return this.planesService.getPlan(id);
  }

  @Post()
  createPlan(@Body() newPlan: CreatePlanDto) {
    return this.planesService.createPlan(newPlan);
  }

  @Delete(':id')
  deletePlan(@Param('id', ParseIntPipe) id: number) {
    return this.planesService.deletePlan(id);
  }

  @Put(':id')
  updatePlan(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    plan: UpdatePlanDto,
  ) {
    return this.planesService.updatePlan(id, plan);
  }
}
