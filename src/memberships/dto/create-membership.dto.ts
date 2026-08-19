import { ApiProperty } from '@nestjs/swagger';
import { Trim } from '../../users/dataSanitizer/Sanitizer.js';
import { OrganizationMemberRoles } from '../../../generated/prisma/enums.js';
import { IsString, IsUUID, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateMembershipDto {
  @ApiProperty({
    required: true,
    example: '8be4df61-93ca-11d2-aa0d-00e098032b8c',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Trim()
  organizationId!: string;

  @ApiProperty({
    required: true,
    example: '8be4df61-93ca-11d2-aa0d-00e098032b8c',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Trim()
  userId!: string;

  @ApiProperty({ required: true, example: 'MEMBER | MANAGER' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(OrganizationMemberRoles)
  @Trim()
  role?: OrganizationMemberRoles = 'MEMBER';
}
