import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Call} from "./entities/call.entity";
import {Plan} from "../plans/entities/plan.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Call,Plan])],
  controllers: [CallsController],
  providers: [CallsService]
})
export class CallsModule {}
