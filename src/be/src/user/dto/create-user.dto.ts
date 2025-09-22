// dto/create-user.dto.ts
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  @MinLength(6)
  readonly password: string; // should already be hashed before saving

  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(['male', 'female', 'other'])
  readonly sex: 'male' | 'female' | 'other';
}
