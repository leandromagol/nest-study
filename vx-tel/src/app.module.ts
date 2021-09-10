import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CallsModule } from './calls/calls.module';
import {Connection} from "typeorm";
import {Call} from "./calls/entities/call.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_DOCKER_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Call],
        synchronize: true,
    }), CallsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
