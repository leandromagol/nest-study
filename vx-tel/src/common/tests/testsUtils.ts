import {Call} from "../../calls/entities/call.entity";

export default class testsUtils{
    static validCall(): Call {
        const validCall = new Call();
        validCall.id = 1;
        validCall.origin_ddd = 11;
        validCall.destiny_ddd = 16;
        validCall.price_per_minute = 190;
        return validCall;
    }
}