import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByMail(username);
        if (!user){
            return null
        }
        const validPass = await this.validatePassword(user, pass);
        if (user && validPass) {
            return user;
        }
        return null;
    }

    async validatePassword(user: User, password: string) {
        return await bcrypt.compare(password, user.password);
    }

    async login(user: any) {
        const payload = {username: user.name, sub: user.email};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
