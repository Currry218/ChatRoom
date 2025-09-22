// dto/create-chatroom-member.dto.ts
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  readonly roomId: string;

  @IsString()
  readonly userId: string;

  @IsEnum(['member', 'admin', 'owner'])
  readonly role: 'member' | 'admin' | 'owner';

  @IsOptional()
  readonly joinedAt?: Date;

  @IsOptional()
  @IsBoolean()
  readonly isNotHere?: boolean;

  @IsOptional()
  @IsString()
  readonly lastSeenMsgId?: string;

  @IsOptional()
  readonly lastSeenAt?: Date;
}
