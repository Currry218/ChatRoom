import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'ChatRoom', required: true })
  roomId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  messenger: string;

  @Prop({ enum: ['text', 'image', 'file', 'system'], required: true })
  type: string;

  @Prop({ required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
