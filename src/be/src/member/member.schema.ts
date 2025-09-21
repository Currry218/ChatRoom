import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Member extends Document {
  @Prop({ type: Types.ObjectId, ref: 'ChatRoom', required: true })
  roomId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ enum: ['member', 'admin', 'owner'], default: 'member' })
  role: string;

  @Prop({ default: Date.now })
  joinedAt: Date;

  @Prop({ default: false })
  isNotHere: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  lastSeenMsgId: string;

  @Prop()
  lastSeenAt: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
