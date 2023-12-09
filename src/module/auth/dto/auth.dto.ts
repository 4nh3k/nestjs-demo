import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ default: 'admin' })
  username: string;
  @ApiProperty({ default: 'admin' })
  password: string;
}
