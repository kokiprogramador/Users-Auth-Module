import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { Public } from './decorators/is-public.decorator.js';
import { RefreshAuthGuard } from './guards/refresh-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiCreatedResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }

  @Post("refresh")
  async refreshToken(@Req() req){
  const userId = req.user.id;
  return await this.authService.refreshToken(userId);
  }

  @Post("logout")
  async logOut(@Req() req){
   const userId =  req.user.user_id;
   return await this.authService.logOut(userId);
  }
}
