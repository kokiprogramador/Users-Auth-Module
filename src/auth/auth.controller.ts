import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { Public } from './decorators/is-public.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiCreatedResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }
}
