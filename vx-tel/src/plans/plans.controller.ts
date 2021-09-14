import {Controller, Post, Body, Param, UseGuards, Get, Put} from '@nestjs/common';
import {PlansService} from './plans.service';
import {CreatePlanDto} from './dto/create-plan.dto';
import {UpdatePlanDto} from './dto/update-plan.dto';
import {BaseController} from "../common/controller/base.controller";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { Public } from 'src/common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('api/plans')
export class PlansController extends BaseController {
    constructor(private readonly plansService: PlansService) {
        super(plansService);
    }

    @Get()
    @Public()
    findAll(): Promise<any[]> {
        return super.findAll();
    }

    @Post()
    create(@Body() createPlanDto: CreatePlanDto) {
        return this.plansService.create(createPlanDto);
    }


    @Put(':id')
    update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
        return this.plansService.update(+id, updatePlanDto);
    }

}
