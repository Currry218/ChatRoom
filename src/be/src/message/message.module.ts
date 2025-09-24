import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
// import { MessagesGateway } from './message.gateway';
import { ChatRoomModule } from '../chatroom/chatroom.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    forwardRef(() => MemberModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ChatRoomModule),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService], //MessagesGateway],
})
export class MessageModule {}
