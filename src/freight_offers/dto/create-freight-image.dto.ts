import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateFreightImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  freightId: string;
}
