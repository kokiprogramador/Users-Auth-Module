import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { UpdateOrganizationDto } from './dto/update-organization.dto.js';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/is-public.decorator.js';
import { OrganizationEntity } from './entities/organization.entity.js';

@ApiTags('Organizations')
@Public()
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiCreatedResponse({ type: OrganizationEntity })
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

  @Patch(':id')
  @ApiCreatedResponse({ type: OrganizationEntity })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: OrganizationEntity })
  async remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}
