import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../generated/prisma/client.js';
import { UserType } from '../../../generated/prisma/client.js';
import { IsEnum } from 'class-validator';

type UserHashedRTAndWithoutPassword = Omit<User, 'password' | 'hashedRefreshJwt'>;

export class UserEntity implements UserHashedRTAndWithoutPassword  {
  @ApiProperty({example:"a83ff286-7c5e-4db5-951-d0df0ac1b012"})
  user_id!: string;

  @ApiProperty({example: "user123"})
  userName!: string;

  @ApiProperty({example: "johndoe@gmail.com"})
  email!: string;

  @ApiProperty({example: "2026-09-18T06:30:57.249Z"})
  createdAt!: Date;

  @ApiProperty({example: "2026-09-18T06:30:57.249Z"})
  updatedAt!: Date;

  @ApiProperty({example: "USER, ADMIN"})
  @IsEnum(UserType)
  type: UserType = 'USER';
}
