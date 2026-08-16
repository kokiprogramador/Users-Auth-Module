import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { UpdateOrganizationDto } from './dto/update-organization.dto.js';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}
  async create(createOrganizationDto: CreateOrganizationDto) {
    const organizationCreated = await this.prisma.organization.create({
      data: createOrganizationDto as any,
    });
    return organizationCreated;
  }

  async findAll() {
    return this.prisma.organization.findMany();
  }

  async findOne(organization_id: string) {
    return await this.prisma.organization.findUnique({
      where: {
        organization_id,
      },
    });
  }

  async update(
    organization_id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return await this.prisma.organization.update({
      where: { organization_id },
      data: updateOrganizationDto as any,
    });
  }

  async remove(organization_id: string) {
    return await this.prisma.organization.delete({
      where: {
        organization_id,
      },
    });
  }
}
