import {Seeder} from "nestjs-seeder";
import {InjectRepository} from "@nestjs/typeorm";
import {Plan} from "./entities/plan.entity";
import {Repository} from "typeorm";
import plansFaker from "./plans.faker"
export class PlansSeeder implements Seeder{
    constructor(@InjectRepository(Plan) private planRepository: Repository<Plan>) {
    }
    drop(): Promise<any> {
        return this.planRepository.delete({});
    }

    seed(): Promise<any> {
        const plansArray = [];
        const self = this;

        plansFaker().map(plan=>{
            const createPlan = self.planRepository.create({...plan});
            plansArray.push(createPlan);
        })
        return this.planRepository.insert(plansArray);
    }

}