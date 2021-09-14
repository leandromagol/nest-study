import {Controller, Post, Body, Param, Put, UseGuards} from '@nestjs/common';
import {CallsService} from './calls.service';
import {CreateCallDto} from './dto/create-call.dto';
import {UpdateCallDto} from './dto/update-call.dto';
import {BaseController} from "../common/controller/base.controller";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

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


    @Put(':id')
    update(@Param('id') id: string, @Body() updateCallDto: UpdateCallDto) {
        return this.callsService.update(+id, updateCallDto);
    }
}
