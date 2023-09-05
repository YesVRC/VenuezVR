import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterLocalDto } from './dto/register.local.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async LoginLocal() {}

  @Post('register')
  async RegisterLocal(@Body() body: RegisterLocalDto) {
    await this.authService.RegisterLocal(body);
  }

  @Get('current')
  async GetCurrentUser() {}
}
