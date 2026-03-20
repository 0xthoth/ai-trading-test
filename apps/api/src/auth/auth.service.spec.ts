import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return token for valid credentials', async () => {
    const result = await service.login({
      email: 'demo@lume.ai',
      password: 'password123',
    });

    expect(result.accessToken).toBe('mock-jwt-token');
    expect(result.user.email).toBe('demo@lume.ai');
    expect(result.user.name).toBe('Demo Trader');
  });

  it('should throw for invalid email', async () => {
    await expect(
      service.login({ email: 'wrong@email.com', password: 'password123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw for wrong password', async () => {
    await expect(
      service.login({ email: 'demo@lume.ai', password: 'wrongpass' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
