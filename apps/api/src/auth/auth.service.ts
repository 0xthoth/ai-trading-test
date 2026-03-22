import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

// In-memory demo user store — replace with DB in production
const DEMO_USERS = [
  {
    id: '1',
    email: 'demo@lume.ai',
    // password: "password123"
    passwordHash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36B9PbJjKSInOL1hm7s2OVq',
    name: 'Demo Trader',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto): Promise<{ accessToken: string; user: { id: string; email: string; name: string } }> {
    const user = DEMO_USERS.find((u) => u.email === dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
