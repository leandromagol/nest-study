import {Seeder} from "nestjs-seeder";
import {InjectRepository} from "@nestjs/typeorm";
import {Call} from "./entities/call.entity";
import {Repository} from "typeorm";
import callsFaker from "./calls.faker";
import callsFactory from "./calls.factory"
export class CallsSeeder implements Seeder{
    constructor(@InjectRepository(Call) private callRepository: Repository<Call>) {
    }
    drop(): Promise<any> {
        return this.callRepository.delete({});
    }

   async seed(): Promise<any> {
        const self = this;
        const callsArray = [];
       callsFaker().map(call => {
           const saveCall = callsFactory(call.origin_ddd, call.destiny_ddd, call.price_per_minute);
           const createdCall = self.callRepository.create(saveCall);
           callsArray.push(createdCall);

       })
        return this.callRepository.insert(callsArray);
    }

}
