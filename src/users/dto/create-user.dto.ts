import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../../../generated/prisma/enums.js';
import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Trim, Lowercase } from '../dataSanitizer/Sanitizer.js';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'CockyElPro' })
  @IsString()
  @IsNotEmpty()
  @Trim()
  userName!: string;

  @ApiProperty({ required: true, example: 'johndoe@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  @Lowercase()
  email!: string;

  @ApiProperty({ required: true, example: 'passwordsex' })
  @IsNotEmpty()
  password!: string;

  @IsEnum(UserType)
  type?: UserType = 'USER';
}
