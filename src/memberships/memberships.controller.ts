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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}


  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @Post()
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.create(createMembershipDto);
  }
  
  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipsService.remove(id);
  }
}
