import {AuthService} from "./auth.service";
import {Controller, Get, Post, Request, UseGuards} from "@nestjs/common";

import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import { Public } from "src/common/decorators/public.decorator";

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @Public()
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}