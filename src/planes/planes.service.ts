import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './plan.entity';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async createPlan(plan: CreatePlanDto) {
    const planFound = await this.planRepository.findOne({
      where: {
        classic: plan.classic,
      },
    });

    if (planFound) {
      return new HttpException('Plan already exist', HttpStatus.CONFLICT);
    }
    const newPlan = this.planRepository.create(plan);
    return this.planRepository.save(newPlan);
  }

  getPlanes() {
    return this.planRepository.find({
      relations: [],
    });
  }

  async getPlan(id: number) {
    const planFound = await this.planRepository.findOne({
      where: {
        id,
      },
      relations: [],
    });

    if (!planFound) {
      return new HttpException('Plan not found', HttpStatus.NOT_FOUND);
    }
    return planFound;
  }

  async deletePlan(id: number) {
    const planFound = await this.planRepository.findOne({
      where: {
        id,
      },
    });

    if (!planFound) {
      return new HttpException('Plan not found', HttpStatus.NOT_FOUND);
    }
    return this.planRepository.delete(planFound);
  }

  async updatePlan(id: number, plan: UpdatePlanDto) {
    const planFound = await this.planRepository.findOne({
      where: {
        id,
      },
    });

    if (!planFound) {
      return new HttpException('Plan not found', HttpStatus.NOT_FOUND);
    }

    const updatePlan = Object.assign(planFound, plan);
    return this.planRepository.save(updatePlan);
  }
}
