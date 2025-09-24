import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MemberModule } from '../member/member.module';
import { ChatRoomModule } from '../chatroom/chatroom.module';
import { AuthModule } from '../auth/auth.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => MemberModule),
    forwardRef(() => ChatRoomModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MessageModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
