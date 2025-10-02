// dto/create-chatroom.dto.ts
import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly avatar: string;

  @IsBoolean()
  readonly isPublic: boolean;

  @IsString()
  readonly owner: string; // User.ID

  @IsBoolean()
  readonly isDirect: boolean;
}
