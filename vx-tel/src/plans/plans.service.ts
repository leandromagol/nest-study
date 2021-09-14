import {Injectable} from '@nestjs/common';
import {CreatePlanDto} from './dto/create-plan.dto';
import {UpdatePlanDto} from './dto/update-plan.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Plan} from "./entities/plan.entity";
import {Repository} from "typeorm";
import {BaseService} from "../common/serivce/base.service";

@Injectable()
export class PlansService extends BaseService {
    constructor(@InjectRepository(Plan) private planRepository: Repository<Plan>) {
        super(planRepository);
    }

    async create(createPlanDto: CreatePlanDto) {
        const plan = this.planRepository.create(createPlanDto);
        return await this.planRepository.save(plan);
    }

    async update(id: number, updatePlanDto: UpdatePlanDto) {
        const plan = await this.planRepository.findOne(id);
        if (!plan) {
            return 'plan not found'
        }

        return await this.planRepository.save({...plan, ...updatePlanDto})
    }


}
