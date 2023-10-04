import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { Plan } from './plan.entity';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Hospital } from 'src/hospitales/hospital.entity';

@Injectable()
export class PlanesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,

    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>
  ) {}

  async createPlan(plan: CreatePlanDto) {
    const planFound = await this.planRepository.findOne({
      where: {
        type: plan.type,
      },
    });

    if (planFound) {
      return new HttpException('Plan already exist', HttpStatus.CONFLICT);
    }
    const newPlan = this.planRepository.create(plan);
    await this.planRepository.save(newPlan);
    await this.addPlanToHospital(newPlan.id, newPlan.hospitalId)
    return newPlan
  }

  async addPlanToHospital(plan: number, hospital: number) {
    const planFound = await this.planRepository.findOne({where: {
      id: plan
    }})

    const hospitalFound = await this.hospitalRepository.findOne({where: {
      id: hospital
    }})

    if (!planFound || !hospitalFound) {
      return new HttpException("Plan or hospital don't exist", HttpStatus.NOT_FOUND)
    }

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('hospitales_planes_planes')
      .values({ hospitalesId: hospitalFound.id, planesId: planFound.id })
      .execute();
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
    const planFound = await this.planRepository.findOne({where: {
      id
    }});
    if (!planFound) {
      return new HttpException('Plan not found', HttpStatus.NOT_FOUND);
    }
    return this.planRepository.delete({id: planFound.id});
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
