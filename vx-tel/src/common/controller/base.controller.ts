import {BaseService} from "../serivce/base.service";
import {Body, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {CreateUserDto} from "../../users/dto/create-user.dto";
import {UpdateUserDto} from "../../users/dto/update-user.dto";

export abstract class BaseController{
    protected constructor(private service : BaseService) {
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}