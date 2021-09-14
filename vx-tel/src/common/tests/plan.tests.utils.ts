import {Plan} from "../../plans/entities/plan.entity";
import {CreatePlanDto} from "../../plans/dto/create-plan.dto";
import {UpdatePlanDto} from "../../plans/dto/update-plan.dto";

const validPlan1 = new Plan();
validPlan1.id = 1;
validPlan1.free_call_time = 30;
validPlan1.extra_minutes_addition = 10;
validPlan1.name = 'FaleMais 30';

const validPlan2 = new Plan();
validPlan2.id = 2;
validPlan2.free_call_time = 60;
validPlan2.extra_minutes_addition = 10;
validPlan2.name = 'FaleMais 60'

export default class planTestsUtils {

    static validPlans(): Plan[] {
        const validPlans = [];
        validPlans.push(validPlan1, validPlan2)
        return validPlans;
    }

    static validPlan(): Plan {
        return validPlan1
    }

    static validCreatePlanDTO(): CreatePlanDto {
        const validCreatePlanDTO = new CreatePlanDto()
        validCreatePlanDTO.free_call_time = 30;
        validCreatePlanDTO.extra_minutes_addition = 10;
        validCreatePlanDTO.name = 'FaleMais 30'
        return validCreatePlanDTO
    }

    static validUpdatePlanDTO(): UpdatePlanDto {
        const validUpdatedPlanDTO = new UpdatePlanDto()
        validUpdatedPlanDTO.free_call_time = 60;
        validUpdatedPlanDTO.extra_minutes_addition = 10;
        validUpdatedPlanDTO["name"] = "FaleMais 60"
        return validUpdatedPlanDTO
    }

    static validUpdatedPlan(): Plan {
        return validPlan2
    }

}