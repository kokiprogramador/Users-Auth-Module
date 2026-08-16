import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Trim, ToNumber } from '../../users/dataSanitizer/Sanitizer.js';

export class CreateOrganizationDto {
  @ApiProperty({ required: true, example: 'Los happpydogs' })
  @IsString()
  @IsNotEmpty()
  @Trim()
  organizationName!: string;

  @ApiProperty({ required: true, example: '1/2/3 etc' })
  @IsNotEmpty()
  @IsNumber()
  @ToNumber()
  organizationNumber!: string;
}
