import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Matches } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    example: 'freeze-dried-candied-worm-bag',
    description: 'The slug for the product',
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be a valid kebab-case string',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: 1,
    description: 'The quantity of the product to add to the cart',
  })
  @IsInt()
  quantity: number = 1;
}
