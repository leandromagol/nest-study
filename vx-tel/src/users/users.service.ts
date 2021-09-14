import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {BaseService} from "../common/serivce/base.service";

@Injectable()
export class UsersService extends BaseService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super(userRepository);
    }

    async create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            return 'user not found'
        }
        return await this.userRepository.save({...user, ...updateUserDto})
    }

    async findOneByMail(email: string): Promise<User> {
        return this.userRepository.findOne({email: email});
    }
}
