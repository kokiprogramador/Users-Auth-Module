import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service.js';
import type { ConfigType } from '@nestjs/config';
import type { Request } from 'express';
import refreshJwtConfig from '../config/refresh-jwt.config.js';
import { argon2 } from 'crypto';
import { AuthService } from '../auth.service.js';

@Injectable()
export class refreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
      @Inject(refreshJwtConfig.KEY)
      private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
      private usersService: UsersService,
      private authService: AuthService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(process.env.REFRESH_SECRET),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: { userId }) {
    const user = await this.usersService.findOne(payload.userId);
     if (!user || !user.hashedRefreshJwt) {
       throw new UnauthorizedException('Invalid refresh token');
     }
    const userId = await payload.userId;
    const refreshToken =  req.get('authorization')!.replace('Bearer', '').trim()
    return this.authService.validateRefresthToken(userId, refreshToken);
  }
}
