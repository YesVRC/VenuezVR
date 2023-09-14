import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterLocalDto } from './dto/register-local.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import e from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LoginLocalDto } from './dto/login-local.dto';
import {RequestUser} from "./types/request-user";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async LoginLocal(@Req() req: e.Request, @Body() body: LoginLocalDto) {
    return await this.authService.genTokens(req.user['userId']);
  }

  @Post('register')
  async RegisterLocal(@Body() body: RegisterLocalDto) {
    return await this.authService.RegisterLocal(body);
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async GetCurrentUser(@Req() request: RequestUser) {
    return request.user;
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async RefreshUserToken(@Req() request: RequestUser) {
    return await this.authService.createAuthToken(request.user.id);
  }
}
