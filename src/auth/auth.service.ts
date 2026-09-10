import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity.js';
import type { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import refreshJwtConfig from './config/refresh-jwt.config.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY) private refreshTokenConfig:ConfigType<typeof refreshJwtConfig>
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const userId = user.user_id;
    const [accessToken, refresthToken] = await this.generateTokens(userId);
    const hashedRefresthToken = await argon2.hash(refresthToken);
    await this.usersService.updateHashedRefreshToken(userId, hashedRefresthToken)
    return {
      id: userId,
      token: accessToken,
      refresthToken: refresthToken
    }
  }
  async generateTokens(userId: string){
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({userId}),
      this.jwtService.signAsync({userId}, this.refreshTokenConfig)
    ]);
    return [
      accessToken,
      refreshToken
    ]
  }
  async refreshToken(userId: string) {
    const [accessToken, refresthToken] = await this.generateTokens(userId);
    const hashedRefresthToken = await argon2.hash(refresthToken);
    await this.usersService.updateHashedRefreshToken(userId, hashedRefresthToken)
    return [
      {id: userId,
      token: accessToken,
      refresthToken: refresthToken
    }]
  }
  async validateRefresthToken(userId: string, refreshToken: string){
    const user = await this.usersService.findOne(userId)
    const refreshTokenMatches = argon2.verify(String(user!.hashedRefreshJwt), refreshToken);
    if(!refreshTokenMatches){
      throw new UnauthorizedException('Invalid refresh token');
    }
    return {id: user!.user_id}
  }

  async logOut(userId){
    return await this.usersService.updateHashedRefreshToken(userId, null); 
  }
}
