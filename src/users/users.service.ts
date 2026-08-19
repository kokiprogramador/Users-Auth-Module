import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userCreated = await this.prisma.user.create({
      data: createUserDto,
    });
    return userCreated;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(user_id: string) {
    return await this.prisma.user.findUnique({
      where: {
        user_id,
      },
      include: {
        memberships: true,
      },
    });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { user_id },
      data: updateUserDto,
    });
  }

  async remove(user_id: string) {
    return await this.prisma.user.delete({
      where: {
        user_id,
      },
    });
  }
}
