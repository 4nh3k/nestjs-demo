import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: 'The age of a cat',
    minimum: 0,
    type: Number,
  })
  age: number;

  @ApiProperty()
  breed: string;
}
