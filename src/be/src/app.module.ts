import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [UserModule, ChatroomModule, MessageModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
