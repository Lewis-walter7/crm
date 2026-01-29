
import '../dns_patch';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { INestApplicationContext } from '@nestjs/common';

async function bootstrap() {
    console.log('Starting Auth Flow Verification...');
    let app: INestApplicationContext;
    try {
        app = await NestFactory.createApplicationContext(AppModule);
    } catch (err) {
        console.error('Failed to create app context:', err);
        return;
    }

    try {
        const authService = app.get<AuthService>(AuthService);
        const usersService = app.get<UsersService>(UsersService);

        const testUser = {
            username: `testuser_${Date.now()}`,
            password: 'testpassword123',
            email: 'test@example.com'
        };

        console.log(`1. Registering new user: ${testUser.username}`);
        const registeredUser = await authService.register(testUser);
        console.log('   Registration successful. User ID:', registeredUser['_id']);

        console.log('2. Attempting Login with valid credentials...');
        // We need to validate first usually, but AuthService.login takes a user object.
        // Let's validate first to mimic controller
        const validatedUser = await authService.validateUser(testUser.username, testUser.password);

        if (validatedUser) {
            console.log('   Validation successful:', validatedUser);
            const token = await authService.login(validatedUser);
            console.log('   Login successful. Access Token generated:', token.access_token ? 'YES' : 'NO');
        } else {
            console.error('   Validation FAILED.');
        }

        console.log('3. Attempting Login with INVALID password...');
        const invalidUser = await authService.validateUser(testUser.username, 'wrongpassword');
        if (invalidUser) {
            console.error('   Validation should have failed but PASSED!');
        } else {
            console.log('   Validation correctly failed for invalid password.');
        }

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await app.close();
    }
}
bootstrap();
