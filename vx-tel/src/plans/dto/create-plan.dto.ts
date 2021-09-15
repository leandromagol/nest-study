import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreatePlanDto {
    @IsNotEmpty() @IsNumber()
    free_call_time: number
    @IsNotEmpty() @IsString()
    name: string
    @IsNotEmpty() @IsNumber()
    extra_minutes_addition: number
    
    @IsNotEmpty() @IsNumber()
    purchase_cost: number
}
