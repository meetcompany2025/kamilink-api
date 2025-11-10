import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'ID do frete que será avaliado',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  freightId: string;

  @ApiProperty({
    description: 'Nota da avaliação (1 a 5)',
    example: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Comentário opcional da avaliação',
    example: 'Ótimo serviço, entrega rápida.',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
