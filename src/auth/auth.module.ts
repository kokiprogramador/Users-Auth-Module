import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersModule } from '../users/users.module.js';
import { jwtStrategy } from './strategies/jwt.strategy.js';
import { refreshJwtStrategy } from './strategies/refresh.strategy.js';
import { UsersService } from '../users/users.service.js';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config.js';
import refreshJwtConfig from './config/refresh-jwt.config.js';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig)
  ],
  controllers: [AuthController],
  providers: [AuthService, 
              PrismaService, 
              UsersService, 
              jwtStrategy,
              refreshJwtStrategy,
              {
                provide: APP_GUARD,
                useClass: JwtAuthGuard
              }
             ],
})
export class AuthModule {}
