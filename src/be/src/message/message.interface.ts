// interfaces/message.interface.ts
import { Document } from 'mongoose';

export interface Message extends Document {
  readonly roomId: string;
  readonly messenger: string;
  readonly type: 'text' | 'image' | 'file' | 'system';
  readonly content?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
