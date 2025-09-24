import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string; // should already be hashed before saving

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEmail()
  email: string;

  @IsEnum(['male', 'female', 'other'])
  sex: 'male' | 'female' | 'other';
}
