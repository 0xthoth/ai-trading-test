import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

// In-memory demo user store — replace with DB in production
const DEMO_USERS = [
  {
    id: '1',
    username: 'admin',
    // password: "password123"
    passwordHash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36B9PbJjKSInOL1hm7s2OVq',
    name: 'Admin',
  },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto): Promise<{ accessToken: string; user: { id: string; username: string; name: string } }> {
    const user = DEMO_USERS.find((u) => u.username === dto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: { id: user.id, username: user.username, name: user.name },
    };
  }
}
