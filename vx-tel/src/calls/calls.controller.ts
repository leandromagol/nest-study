import {Controller, Post, Body, Param, Put, UseGuards, Get, Query} from '@nestjs/common';
import {CallsService} from './calls.service';
import {CreateCallDto} from './dto/create-call.dto';
import {UpdateCallDto} from './dto/update-call.dto';
import {BaseController} from "../common/controller/base.controller";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Public} from "../common/decorators/public.decorator";
import {simulateCallDto} from "./dto/simulate-call.dto";

@UseGuards(JwtAuthGuard)
@Controller('api/calls')
export class CallsController extends BaseController {
    constructor(private readonly callsService: CallsService) {
        super(callsService);
    }

    @Post()
    create(@Body() createCallDto: CreateCallDto) {
        return this.callsService.create(createCallDto);
    }

    @Get()
    @Public()
    findAll(): Promise<any[]> {
        return super.findAll();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCallDto: UpdateCallDto) {
        return this.callsService.update(+id, updateCallDto);
    }

    @Get('simulation')
    @Public()
    simulation(@Query() params: simulateCallDto) {
        return this.callsService.simulation(params);
    }
}
