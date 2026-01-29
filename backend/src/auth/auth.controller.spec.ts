import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token', async () => {
      const user = { username: 'test', userId: 1 };
      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockResolvedValue({ access_token: 'jwt_token' });

      const result = await controller.login({ username: 'test', password: 'password' });
      expect(result).toEqual({ access_token: 'jwt_token' });
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request', () => {
      const req = { user: { userId: 1, username: 'test' } };
      expect(controller.getProfile(req)).toEqual(req.user);
    });
  });
});
