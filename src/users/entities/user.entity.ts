import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../generated/prisma/client.js';
import { UserType } from '../../../generated/prisma/client.js';
import { IsEnum } from 'class-validator';

type UserWithoutPassword = Omit<User, 'password'>;

export class UserEntity implements UserWithoutPassword {
  @ApiProperty()
  user_id!: string;

  @ApiProperty()
  userName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty()
  @IsEnum(UserType)
  type: UserType = 'USER';
}
