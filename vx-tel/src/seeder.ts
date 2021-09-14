import {seeder} from "nestjs-seeder";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Call} from "./calls/entities/call.entity";
import {Plan} from "./plans/entities/plan.entity";
import {CallsSeeder} from "./calls/calls.seeder";
import {PlansSeeder} from "./plans/plans.seeder";
import {User} from "./users/entities/user.entity";
import {UsersSeeder} from "./users/users.seeder";

seeder({
    imports:[
        TypeOrmModule.forRoot({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            type: process.env.DB_TYPE,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_DOCKER_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [Call,Plan,User],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Call,Plan,User])
    ]
}).run([CallsSeeder,PlansSeeder,UsersSeeder])