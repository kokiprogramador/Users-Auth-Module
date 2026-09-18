import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { MembershipsService } from './memberships.service.js';
import { CreateMembershipDto } from './dto/create-membership.dto.js';
import { Admin } from '../auth/decorators/admin.decorator.js';
import { UserType } from '../../generated/prisma/enums.js';
import { AdminsGuard } from '../auth/guards/admin.guard.js';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMembershipResponse, RemoveMembershipResponse } from './responses/memberships.response.js';

@ApiTags('Memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}


  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @Post()
  @ApiCreatedResponse({
    description: "Create a membership for a user",
    type: CreateMembershipResponse
  })
  @ApiOperation({
    summary: 'CREATE MEMBERSHIP',
    description: 'Private endpoint for creating memberships, only accessed via admin user.'
  })
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.create(createMembershipDto);
  }
  
  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @Delete(':id')
  @ApiCreatedResponse({
    description: "Remove membership from a user",
    type: RemoveMembershipResponse
  })
  @ApiOperation({
    summary: 'DELETE MEMBERSHIP',
    description: 'Private endpoint for deleting memberships, only accessed via admin user.'
  })
  remove(@Param('id') id: string) {
    return this.membershipsService.remove(id);
  }
}
