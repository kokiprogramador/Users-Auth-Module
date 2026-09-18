import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { UpdateOrganizationDto } from './dto/update-organization.dto.js';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrganizationEntity } from './entities/organization.entity.js';
import { Admin } from '../auth/decorators/admin.decorator.js';
import { UserType } from '../../generated/prisma/enums.js';
import { AdminsGuard } from '../auth/guards/admin.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}


  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ description:'Create organization', type: OrganizationEntity })
  @ApiOperation({
    summary: 'CREATE ORGANIZATION',
    description: 'Private endpoint for creating organizations, only accessed via admin user.'
  })
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    const data = await this.organizationsService.create(createOrganizationDto);
    if (!data) {
      throw new BadRequestException('Data is missing');
    }
    return data;
  }

  @Get()
  @ApiCreatedResponse({ description:'Get all organizations', type: OrganizationEntity })
  @ApiOperation({
    summary: 'GET ORGANIZATIONS',
    description: 'Private endpoint for get all organizations, only accessed via admin user.'
  })
  async findAll() {
    const organizations = await this.organizationsService.findAll();
    if (!organizations) {
      throw new NotFoundException('Organizations not found');
    }
    return organizations;
  }

  @Get(':id')
  @ApiCreatedResponse({ description:'Get one organization', type: OrganizationEntity })
  @ApiOperation({
    summary: 'GET ONE ORGANIZATION',
    description: 'Private endpoint for get only one organization, only accessed via admin user.'
  })
  async findOne(@Param('id') id: string) {
    const organization = await this.organizationsService.findOne(id);
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }
  
  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard) 
  @Patch(':id')
  @ApiCreatedResponse({description:'Update one organization', type: OrganizationEntity })
  @ApiOperation({
    summary: 'UPDATE ORGANIZATION',
    description: 'Private endpoint for updating organizations, only accessed via admin user.'
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }
  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @Delete(':id')
  @ApiCreatedResponse({ description:'Delete one organization', type: OrganizationEntity })
  @ApiOperation({
    summary: 'DELETE ORGANIZATION',
    description: 'Private endpoint for deleting organizations, only accessed via admin user.'
  })
  async remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}
