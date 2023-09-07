import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterLocalDto } from './dto/register-local.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  //Route Methods
  async RegisterLocal(body: RegisterLocalDto) {
    const exists = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: { equals: body.username, mode: 'insensitive' } },
          { email: { equals: body.email, mode: 'insensitive' } },
        ],
      },
    });
    if (exists)
      throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
    const user = await this.prismaService.user.create({
      data: {
        username: body.username,
        email: body.email,
        hashPass: await bcrypt.hash(body.password, 10),
      },
    });
    return user;
  }
  //Utils
  async createAuthToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { userId: userId },
      {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: '1h',
      },
    );
    return Promise.resolve(token);
  }
  async createRefreshToken(userId: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { userId: userId },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: '3d',
      },
    );
    return Promise.resolve(token);
  }

  async genTokens(userId: string): Promise<{ at: string; rt: string }> {
    const at = await this.createAuthToken(userId);
    const rt = await this.createRefreshToken(userId);
    return { at, rt };
  }
}
