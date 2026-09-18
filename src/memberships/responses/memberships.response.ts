import { ApiProperty } from "@nestjs/swagger";

export class CreateMembershipResponse {
	@ApiProperty({example:'a83ff286-7c5e-4db5-951-d0df0ac1b012'})
	organizationId: string;

	@ApiProperty({example:'a83ff286-7c5e-4db5-951-d0df0ac1b012'})
	userId: string;

	@ApiProperty({example:'MEMBER | MANAGER'})	
	Role: string;
}

export class RemoveMembershipResponse{
	@ApiProperty({example: 'a83ff286-7c5e-4db5-951-d0df0ac1b012'})
	id: string;
}