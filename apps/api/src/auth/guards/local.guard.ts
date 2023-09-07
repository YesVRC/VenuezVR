import { AuthGuard } from '@nestjs/passport';
import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { AuthService } from '../auth.service';
import e from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import {User} from "@prisma/client";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: e.Request = context.switchToHttp().getRequest();
    const username = request.body['usernameOrEmail'];
    const password = request.body['password'];
    const exists: User = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: { equals: username, mode: 'insensitive' } },
          { email: { equals: username, mode: 'insensitive' } },
        ],
      },
    });
    if (!exists)
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);

    const compare = bcrypt.compare(password, exists.hashPass);
    if (!compare)
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
    delete exists.hashPass;
    request.user = exists;
    return true;
  }
}
