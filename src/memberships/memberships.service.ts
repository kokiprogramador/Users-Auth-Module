import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto.js';
import { UpdateMembershipDto } from './dto/update-membership.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MembershipsService {
  constructor(private prisma: PrismaService) {}

  async create(createMembershipDto: CreateMembershipDto) {
    return await this.prisma.organizationMemberShip.create({
      data: {
        organizationId: createMembershipDto.organizationId,
        userId: createMembershipDto.userId,
        role: createMembershipDto.role,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.organizationMemberShip.delete({
      where: { id },
    });
  }
}
