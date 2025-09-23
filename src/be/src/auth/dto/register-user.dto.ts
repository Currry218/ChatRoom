import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class registerUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string; // should already be hashed before saving

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEmail()
  email: string;

  @IsEnum(['male', 'female', 'other'])
  sex: 'male' | 'female' | 'other';
}
