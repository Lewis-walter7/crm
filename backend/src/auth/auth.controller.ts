import { Controller, Get, Post, Body, UnauthorizedException, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('nextcloud')
    @UseGuards(AuthGuard('nextcloud'))
    async nextcloudAuth(@Req() req) {
        // Guard initiates the redirect
    }

    @Get('nextcloud/callback')
    @UseGuards(AuthGuard('nextcloud'))
    async nextcloudAuthRedirect(@Req() req) {
        return this.authService.login(req.user);
    }

    @Post('login')
    async login(@Body() body: any) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.login(user); // Returning access_token
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
