import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  id: string;
  token: string;
  refresthToken: string;
}
