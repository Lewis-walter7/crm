
# Auth Module Implementation Plan

## Overview
Implement JWT authentication and a skeleton for Nextcloud OAuth2.

## Files
- `src/auth/auth.module.ts`: Configure JWT and Strategies.
- `src/auth/jwt.strategy.ts`: Passport strategy for JWT.
- `src/auth/auth.service.ts`: Handle login and validation.
- `src/auth/auth.controller.ts`: Endpoints for login/callback.

## Environment Variables
Needs `JWT_SECRET` in `.env`.

## Steps
1. Create `JwtStrategy`.
2. Update `AuthModule` to import `PassportModule` and `JwtModule`.
3. Implement `AuthService` with a mock validation for now (or a simple one).
4. Create a protected route to verify.
