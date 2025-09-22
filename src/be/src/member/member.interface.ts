// interfaces/chatroom-member.interface.ts
import { Document } from 'mongoose';

export interface Member extends Document {
  readonly roomId: string;
  readonly username: string;
  readonly role: 'member' | 'admin' | 'owner';
  readonly joinedAt: Date;
  readonly isNotHere: boolean;
  readonly lastSeenMsgId?: string;
  readonly lastSeenAt?: Date;
}
