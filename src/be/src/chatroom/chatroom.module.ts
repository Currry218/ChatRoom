import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomSchema } from './chatroom.schema';
import { ChatRoomService } from './chatroom.service';
import { ChatRoomController } from './chatroom.controller';
import { MemberModule } from '../member/member.module';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
    ]),
    forwardRef(() => MemberModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MessageModule),
  ],
  providers: [ChatRoomService],
  controllers: [ChatRoomController],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
