import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ChatRoom extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: true })
  isPublic: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: string; // ref to User

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  currentMember: string[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
