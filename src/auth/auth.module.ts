import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersModule } from '../users/users.module.js';
import { jwtStrategy } from './strategy/jwt.strategy.js';
import { UsersService } from '../users/users.service.js';

export const jwtSecret = process.env.SECRET;

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, jwtStrategy],
})
export class AuthModule {}
