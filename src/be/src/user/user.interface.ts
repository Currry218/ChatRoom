// interfaces/user.interface.ts
import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  readonly avatar?: string;
  readonly email: string;
  readonly sex: 'male' | 'female' | 'other';
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
