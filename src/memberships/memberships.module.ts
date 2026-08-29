import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service.js';
import { MembershipsController } from './memberships.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';


@Module({
  imports: [PrismaModule],
  controllers: [MembershipsController],
  providers: [
    MembershipsService, 
    PrismaService,
    {provide: APP_GUARD, useClass: JwtAuthGuard}
  ],
})
export class MembershipsModule {}
