import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterLocalDto } from './dto/register-local.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './passport/authguards/local.guard';
import e from 'express';
import { JwtAuthGuard } from './passport/authguards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  async LoginLocal(@Req() req: e.Request) {
    return req.user;
  }

  @Post('register')
  async RegisterLocal(@Body() body: RegisterLocalDto) {
    return await this.authService.RegisterLocal(body);
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async GetCurrentUser(@Req() request: e.Request) {
    return request.user;
  }
}
