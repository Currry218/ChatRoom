import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  avatar?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ enum: ['male', 'female', 'other'], default: 'other' })
  sex: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
