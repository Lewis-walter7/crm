
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class NextcloudStrategy extends PassportStrategy(Strategy, 'nextcloud') {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        super({
            authorizationURL: `${configService.get<string>('NEXTCLOUD_URL') || 'http://localhost'}/apps/oauth2/authorize`,
            tokenURL: `${configService.get<string>('NEXTCLOUD_URL') || 'http://localhost'}/apps/oauth2/api/v1/token`,
            clientID: configService.get<string>('NEXTCLOUD_CLIENT_ID') || 'mock_client_id',
            clientSecret: configService.get<string>('NEXTCLOUD_CLIENT_SECRET') || 'mock_client_secret',
            callbackURL: configService.get<string>('NEXTCLOUD_CALLBACK_URL') || 'http://localhost:3000/auth/nextcloud/callback',
            scope: 'openid',
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
        // Ideally fetch user profile from Nextcloud here using accessToken
        // specific to Nextcloud implementation (OIDC or custom endpoint)
        // For skeleton, we'll assume we get enough info or fetch it.

        // We might need to fetch the user profile manually since standard OAuth2 strategy might not do strictly OIDC discovery automatically without 'passport-openidconnect' or specific config.
        // However, usually one calls the userinfo endpoint.
        // Let's implement a userProfile override if needed, but for now basic validation passing token.

        const user = {
            userId: 'nextcloud-user-id-placeholder',
            username: 'nextcloud-user',
            accessToken
        };
        return done(null, user);
    }

    // Override userProfile to fetch user details if needed:
    // userProfile(accessToken, done) { ... }
}
