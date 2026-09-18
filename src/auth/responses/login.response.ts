import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
	@ApiProperty({example:'a83ff286-7c5e-4db5-951-d0df0ac1b012'})
	id: string;

	@ApiProperty({example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'})
	token: string;

	@ApiProperty({example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'})
	refreshToken: string;
}

export class LogOutResponse {
	@ApiProperty({example:'a83ff286-7c5e-4db5-951-d0df0ac1b012'})
	id: string;

	@ApiProperty({example:'cockyeldev'})
	userName: string;

	@ApiProperty({example:'2005-09-10T20:05:29.689Z'})
	updateAt: string;
}
