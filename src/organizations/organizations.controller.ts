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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationEntity } from './entities/organization.entity.js';
import { Admin } from '../auth/decorators/admin.decorator.js';
import { UserType } from '../../generated/prisma/enums.js';
import { AdminsGuard } from '../auth/guards/admin.guard.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}


  @ApiCreatedResponse({ type: OrganizationEntity })
  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    const data = await this.organizationsService.create(createOrganizationDto);
    if (!data) {
      throw new BadRequestException('Data is missing');
    }
    return data;
  }

  @Get()
  @ApiCreatedResponse({ type: OrganizationEntity })
  async findAll() {
    const organizations = await this.organizationsService.findAll();
    if (!organizations) {
      throw new NotFoundException('Organizations not found');
    }
    return organizations;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: OrganizationEntity })
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
  @ApiCreatedResponse({ type: OrganizationEntity })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }
  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @Delete(':id')
  @ApiCreatedResponse({ type: OrganizationEntity })
  async remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}
