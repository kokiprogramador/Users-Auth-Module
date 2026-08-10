import { CreateUserDto } from './create-user.dto.js';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserType } from '../../../generated/prisma/enums.js';
import { Trim, Lowercase } from '../dataSanitizer/Sanitizer.js';
import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, example: 'CockyElPro' })
  @IsString()
  @IsNotEmpty()
  @Trim()
  userName?: string | undefined;

  @ApiProperty({ required: false, example: 'johndoe@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  @Lowercase()
  email?: string | undefined;

  @ApiProperty({ required: false, example: 'passwordsex' })
  @IsString()
  @IsNotEmpty()
  password?: string | undefined;

  @ApiProperty({ required: false, example: 'USER | ADMIN' })
  @IsEnum(UserType)
  type?: UserType | undefined;
}
