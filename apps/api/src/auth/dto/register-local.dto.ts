import { ApiProperty } from '@nestjs/swagger';

export class RegisterLocalDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
