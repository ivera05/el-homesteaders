import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { UserDto } from '@modules/users/dto/user.dto';

export class CartDto {
  @ApiProperty({ example: 'cart-id', description: 'The ID of the cart' })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    type: UserDto,
    description: 'The user who owns the cart',
  })
  @IsOptional()
  user?: UserDto;

  @ApiPropertyOptional({
    example: 'cart-items',
    description: 'The items in the cart',
  })
  @IsOptional()
  items: any[];

  @ApiPropertyOptional({
    example: '2026-03-29T12:00:00.000Z',
    description: 'The date and time the cart was created',
  })
  @IsOptional()
  createdAt: Date;

  @ApiPropertyOptional({
    example: '2026-03-29T12:00:00.000Z',
    description: 'The date and time the cart was last updated',
  })
  @IsOptional()
  updatedAt: Date;
}
