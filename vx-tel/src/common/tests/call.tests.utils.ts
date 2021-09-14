import {Call} from "../../calls/entities/call.entity";
import {CreateCallDto} from "../../calls/dto/create-call.dto";
import {UpdateCallDto} from "../../calls/dto/update-call.dto";

export default class callTestsUtils {
    static validCalls(): Call[] {
        const validCalls = [];
        const validCall1 = new Call();
        validCall1.id = 1;
        validCall1.origin_ddd = 11;
        validCall1.destiny_ddd = 16;
        validCall1.price_per_minute = 190;

        const validCall2 = new Call();
        validCall2.id = 1;
        validCall2.origin_ddd = 16;
        validCall2.destiny_ddd = 11;
        validCall2.price_per_minute = 290;

        const validCall3 = new Call();
        validCall2.id = 1;
        validCall2.origin_ddd = 11;
        validCall2.destiny_ddd = 17;
        validCall2.price_per_minute = 170;

        validCalls.push(validCall1, validCall2,validCall3)
        return validCalls;
    }

    static validCall(): Call {
        const validCall = new Call();
        validCall.id = 1;
        validCall.origin_ddd = 11;
        validCall.destiny_ddd = 16;
        validCall.price_per_minute = 190;
        return validCall
    }

    static validCreateCallDTO(): CreateCallDto {
        const validCreateCallDTO = new CreateCallDto()
        validCreateCallDTO.origin_ddd = 11;
        validCreateCallDTO.destiny_ddd = 16;
        validCreateCallDTO.price_per_minute = 190
        return validCreateCallDTO
    }
    static validUpdateCallDTO(): UpdateCallDto {
        const validCreateCallDTO = new UpdateCallDto()
        validCreateCallDTO.origin_ddd = 16;
        validCreateCallDTO.destiny_ddd = 11;
        validCreateCallDTO.price_per_minute = 190
        return validCreateCallDTO
    }
    static validUpdatedCall(): Call {
        const validCall = new Call();
        validCall.id = 1;
        validCall.origin_ddd = 16;
        validCall.destiny_ddd = 11;
        validCall.price_per_minute = 190;
        return validCall
    }

}