import { IsEmail, IsNumber, IsString, IsUrl } from 'class-validator';

export class UserDto {
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsUrl()
  avatar: string;

  @IsNumber()
  role: number;

  @IsNumber()
  status: number;
}
