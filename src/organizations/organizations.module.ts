import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';
import { OrganizationsController } from './organizations.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PrismaService } from '../prisma/prisma.service.js';


@Module({
  imports: [PrismaModule],
  controllers: [OrganizationsController],
  providers: [
    OrganizationsService, 
    PrismaService,
  ],
})
export class OrganizationsModule {}
