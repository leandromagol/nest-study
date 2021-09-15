import {Injectable} from '@nestjs/common';
import {CreateCallDto} from './dto/create-call.dto';
import {UpdateCallDto} from './dto/update-call.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Call} from "./entities/call.entity";
import {Repository} from "typeorm";
import {Plan} from "../plans/entities/plan.entity";
import {BaseService} from "../common/serivce/base.service";
import {integerToDecimal} from "../common/helpers";

@Injectable()
export class CallsService extends BaseService {
    constructor(@InjectRepository(Call) private callRepository: Repository<Call>,
                @InjectRepository(Plan) private planRepository: Repository<Plan>) {
        super(callRepository);
    }

    async create(createCallDto: CreateCallDto) {
        const call = this.callRepository.create(createCallDto);
        return await this.callRepository.save(call);
    }

    async update(id: number, updateCallDto: UpdateCallDto): Promise<Call | string> {
        const call = await this.callRepository.findOne(id);
        if (!call) {
            return 'call not found'
        }
        return await this.callRepository.save({...call, ...updateCallDto});
    }

    async simulation(param:{
                         origin_ddd: number, destiny_ddd: number,
                         call_time: number, plan_id: number
                     }) {
        const plan = await this.planRepository.findOne(param.plan_id);
        if (!plan) {
            return 'plan not found'
        }
        const call = await this.callRepository
            .findOne({
                where:
                    {
                        origin_ddd: param.origin_ddd,
                        destiny_ddd: param.destiny_ddd
                    }
            });
        if (!call) {
            return 'call not found'
        }
        return {
            origin: call.origin_ddd,
            destiny: call.destiny_ddd,
            time: param.call_time,
            plan_name: plan.name,
            value_with_plan: integerToDecimal(this.calcValueWithPlan(call, plan,param.call_time)),
            value_without_plan: integerToDecimal(this.calcValueWithoutPlan(call, param.call_time))
        }
    }

    calcValueWithoutPlan(call: Call, call_time: number) {

        return call_time * call.price_per_minute;
    }

    calcValueWithPlan(call: Call, plan: Plan, call_time: number) {
        let overtime = 0;
        if (call_time > plan.free_call_time) {
            overtime = call_time - plan.free_call_time
        }
        let overtime_value = 0;
        if (overtime != 0) {
            for (let _i = 0; _i < overtime; _i++) {
                const addition = Math.round(plan.extra_minutes_addition * call.price_per_minute / 100);
                overtime_value += call.price_per_minute + addition;
            }
        }

        return overtime_value
    }
}
