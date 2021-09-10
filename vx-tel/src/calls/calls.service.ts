import { Injectable } from '@nestjs/common';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Call} from "./entities/call.entity";
import {Repository} from "typeorm";

@Injectable()
export class CallsService {
  constructor(@InjectRepository(Call) private callRepository: Repository<Call>) {
  }
  create(createCallDto: CreateCallDto) {
    return 'This action adds a new call';
  }

 async findAll():Promise<Call[]> {
    return await this.callRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} call`;
  }

  update(id: number, updateCallDto: UpdateCallDto) {
    return `This action updates a #${id} call`;
  }

  remove(id: number) {
    return `This action removes a #${id} call`;
  }
}
