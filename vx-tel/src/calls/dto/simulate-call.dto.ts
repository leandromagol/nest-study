import {IsNotEmpty, IsNumber} from "class-validator";

export class simulateCallDto {
    @IsNotEmpty() @IsNumber()
    origin_ddd: number;
    @IsNotEmpty() @IsNumber()
    destiny_ddd: number;
    @IsNotEmpty() @IsNumber()
    call_time: number;
    @IsNotEmpty() @IsNumber()
    plan_id: number
}