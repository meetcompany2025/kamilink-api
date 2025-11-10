import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}



