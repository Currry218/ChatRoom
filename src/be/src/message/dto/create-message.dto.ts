// dto/create-message.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly roomId: string;

  @IsString()
  readonly messenger: string; // User.ID

  @IsEnum(['text', 'image', 'file', 'system'])
  readonly type: 'text' | 'image' | 'file' | 'system';

  @IsOptional()
  @IsString()
  readonly content?: string;
}
