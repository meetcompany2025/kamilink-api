import { IsUUID } from 'class-validator';

export class ConfirmEmailDto {
  @IsUUID()
  token: string;
}
