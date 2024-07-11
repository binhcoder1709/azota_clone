import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
