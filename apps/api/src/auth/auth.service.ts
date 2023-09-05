import { Injectable } from '@nestjs/common';
import { RegisterLocalDto } from './dto/register.local.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  //Route Methods
  async RegisterLocal(body: RegisterLocalDto) {
    if (this.prismaService.user.findUnique({ where: { id: body.email } })) {
      return 'User already exists';
    }
  }
  //Utils
  async createAuthToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { userId: userId },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );
    return Promise.resolve(
      `Authentication=Bearer ${token}; Path=/; Max-Age=${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    );
  }
  async createRefreshToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { userId: userId },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      },
    );
    return Promise.resolve(
      `Refresh=${token}; Path=/; Max-Age=${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}`,
    );
  }

  async genTokens(userId: string): Promise<{ at: string; rt: string }> {
    const at = await this.createAuthToken(userId);
    const rt = await this.createRefreshToken(userId);
    return { at, rt };
  }
}
