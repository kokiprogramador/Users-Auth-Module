import { PartialType } from '@nestjs/swagger';
import { CreateMembershipDto } from './create-membership.dto.js';

export class UpdateMembershipDto extends PartialType(CreateMembershipDto) {}
