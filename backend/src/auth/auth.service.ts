import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return { userId: user['_id'], username: user.username };
        }
        return null;
    }

    async register(userDto: any) {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userDto.password, salt);
        const newUser = {
            ...userDto,
            password: hashedPassword,
        };
        return this.usersService.create(newUser);
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId || user['userId'] }; // Handle both cases if needed
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
