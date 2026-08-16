import { ApiProperty } from '@nestjs/swagger';

export class OrganizationEntity {
  @ApiProperty()
  organizationId!: string;

  @ApiProperty()
  organizationName!: string;

  @ApiProperty()
  organizationNumber!: number;

  @ApiProperty()
  createdAt!: Date;
}
