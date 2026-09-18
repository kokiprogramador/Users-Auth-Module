import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
// import { AuthEntity } from './entities/auth.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { Public } from './decorators/is-public.decorator.js';
import { RefreshAuthGuard } from './guards/refresh-auth.guard.js';
import { LoginResponse, LogOutResponse } from './responses/login.response.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiCreatedResponse({ description: 'Login', type: LoginResponse})
  @ApiOperation({
    summary: 'LOGIN',
    description: 'Public endpoint to login, you can get access tokens and refresh tokens from here.'
  })
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }
  @ApiOperation({
    summary: 'REFRESH',
    description: 'Refresh endpoint, you can refresh your acccess token a refresh token of a login response.'
  })
  @ApiCreatedResponse({
    description: 'Logout', 
    type: LoginResponse
  })
  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  async refreshToken(@Req() req){
  const userId = req.user.id;
  return await this.authService.refreshToken(userId);
  }

  @ApiOperation({
    summary: 'LOGOUT',
    description: 'LogOut Endpoint'
  })
  @ApiCreatedResponse({
    description: 'Refresh',
    type: LogOutResponse,
  })
  @Post("logout")
  async logOut(@Req() req){
   const userId =  req.user.user_id;
   return await this.authService.logOut(userId);
  }
}
