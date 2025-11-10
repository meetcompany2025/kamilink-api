// cancel-freight.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CancelFreightDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
}
