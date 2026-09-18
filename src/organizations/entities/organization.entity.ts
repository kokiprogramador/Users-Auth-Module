import { ApiProperty } from '@nestjs/swagger';

export class OrganizationEntity {
  @ApiProperty({example: "a83ff286-7c5e-4db5-951-d0df0ac1b012"})
  organizationId!: string;

  @ApiProperty({example: "Happy dogs Org"})
  organizationName!: string;

  @ApiProperty({example: 123})
  organizationNumber!: number;

  @ApiProperty({example: "2026-09-18T06:30:57.249Z"})
  createdAt!: Date;
}
