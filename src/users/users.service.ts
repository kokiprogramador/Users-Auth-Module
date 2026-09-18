import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updateHashedRefreshToken(user_id: string, hashedRefreshJwt: string | null){
    const hashedRTUserUpdated = await this.prisma.user.update({
      where: { 
        user_id 
      },
      data: {
        hashedRefreshJwt
      }
    });
    return {
      id: hashedRTUserUpdated.user_id,
      userName: hashedRTUserUpdated.userName,
      updatedAt: hashedRTUserUpdated.updatedAt,
    }
  }

  async create(createUserDto: CreateUserDto) {
    const {password, ...user } = createUserDto;
    const hashedPassword = await hash(password);
    console.log(hashedPassword)
    const userCreated = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...user
      },
    });
    return userCreated;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      omit: {
        password: true,
        hashedRefreshJwt: true
      }
    });
  }

  async findOne(user_id: string) {
    return await this.prisma.user.findUnique({
      where: {
        user_id,
      }
    });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.prisma.user.update({
      where: { user_id },
      data: updateUserDto,
    });
    return userUpdated;
  }

  async remove(user_id: string) {
    const userDeleted = await this.prisma.user.delete({
      where: {
        user_id,
      },
    });
    return userDeleted;
  }
}
