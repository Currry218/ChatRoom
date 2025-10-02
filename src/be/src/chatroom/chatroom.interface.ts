// interfaces/chatroom.interface.ts
import { Document } from 'mongoose';

export interface ChatRoom extends Document {
  readonly name: string;
  readonly avatar?: string;
  readonly isPublic: boolean;
  readonly owner: string; // User.ID
  readonly isDirect: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
