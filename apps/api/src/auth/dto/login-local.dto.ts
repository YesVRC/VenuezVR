import { ApiProperty } from '@nestjs/swagger';

export class LoginLocalDto {
  @ApiProperty()
  usernameOrEmail: string;
  @ApiProperty()
  password: string;
}
