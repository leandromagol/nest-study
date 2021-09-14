import {Call} from "./entities/call.entity";

export default (origin_ddd: number,destiny_ddd:number,price_per_minute:number): Call=>{
    const call = new Call()
    call.origin_ddd = origin_ddd;
    call.destiny_ddd = destiny_ddd;
    call.price_per_minute = price_per_minute
    return call
}