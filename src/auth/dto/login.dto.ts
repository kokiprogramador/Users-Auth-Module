import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Trim } from '../../users/dataSanitizer/Sanitizer.js';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Trim()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
