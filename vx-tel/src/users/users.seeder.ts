import {Seeder} from "nestjs-seeder";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import usersFaker from "./users.faker"
export class UsersSeeder implements Seeder{
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }
    drop(): Promise<any> {
        return this.userRepository.delete({});
    }

    seed(): Promise<any> {
        const self = this;
        const usersArray =[];
        usersFaker().map(user=>{
            const createdUser = this.userRepository.create(user)
            usersArray.push(createdUser);
        })
        return this.userRepository.insert(usersArray);
    }

}