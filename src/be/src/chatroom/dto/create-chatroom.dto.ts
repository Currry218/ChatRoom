// dto/create-chatroom.dto.ts
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @IsBoolean()
  readonly isPublic: boolean;

  @IsString()
  readonly owner: string; // User.ID

  @IsOptional()
  @IsArray()
  readonly currentMember?: string[]; // Array of User.ID
}
