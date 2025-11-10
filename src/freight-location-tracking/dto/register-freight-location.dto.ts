import { IsUUID, IsLatitude, IsLongitude, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterFreightLocationDto {
  @IsUUID()
  freightId: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsNumber()
  speed?: number;

  @IsOptional()
  @IsString()
  direction?: string;

  @IsISO8601()
  timestamp: string;
}
