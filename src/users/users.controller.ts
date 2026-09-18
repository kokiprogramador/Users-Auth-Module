import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity.js';
import { Public } from '../auth/decorators/is-public.decorator.js';
import { Admin } from '../auth/decorators/admin.decorator.js';
import { UserType } from '../../generated/prisma/enums.js';
import { AdminsGuard } from '../auth/guards/admin.guard.js';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiCreatedResponse({description: "Create User/Sign Up",  type: UserEntity })
  @ApiOperation({
    summary: 'CREATE USER',
    description: 'Public endpoint for creating users, anyone can get access.'
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const userCreated =  await this.usersService.create(createUserDto);
    return {
      id: userCreated!.user_id,
      userName: userCreated!.userName,
      email: userCreated!.email,
      createdAt: userCreated!.createdAt,
      updatedAt: userCreated!.updatedAt,
      userType: userCreated!.type,
    }
  }

  @Get()
  @ApiCreatedResponse({description: "Get User",  type: UserEntity })
  @ApiOperation({
    summary: 'GET USERS',
    description: 'Private endpoint for getting users, only logged users can get access.'
  })
  async findAll(){
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  @ApiCreatedResponse({description: "Get one User",  type: UserEntity })
  @ApiOperation({
    summary: 'GET USER',
    description: 'Private endpoint for getting only one user, only logged users can get access'
  })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      id: user!.user_id,
      userName: user!.userName,
      email: user!.email,
      createdAt: user!.createdAt,
      updatedAt: user!.updatedAt,
      userType: user!.type,
    }
  }

  @Patch(':id')
  @ApiCreatedResponse({description: "Update User",  type: UserEntity })
  @ApiOperation({
    summary: 'UPDATE USER',
    description: 'Private endpoint for updating user, only logged a logged user can get access.'
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(String(id), updateUserDto);
    return {
      id: user!.user_id,
      userName: user!.userName,
      email: user!.email,
      createdAt: user!.createdAt,
      updatedAt: user!.updatedAt,
      userType: user!.type,
    }
  }

  @Admin(UserType.ADMIN)
  @UseGuards(AdminsGuard)
  @Delete(':id')
  @ApiCreatedResponse({description: "Delete user",  type: UserEntity })
  @ApiOperation({
    summary: 'DELETE USER',
    description: 'Private endpoint for deleting users, only admin can delete one user..'
  })
  async remove(@Param('id') id: string) {
    const user =  await this.usersService.remove(id);
    return {
      id: user!.user_id,
      userName: user!.userName,
      email: user!.email,
      createdAt: user!.createdAt,
      updatedAt: user!.updatedAt,
      userType: user!.type,
    }
  }
}
