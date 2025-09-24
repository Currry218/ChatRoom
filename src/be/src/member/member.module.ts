import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './member.schema';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { UserModule } from '../user/user.module';
import { ChatRoomModule } from '../chatroom/chatroom.module';
import { AuthModule } from '../auth/auth.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    forwardRef(() => ChatRoomModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MessageModule),
  ],
  providers: [MemberService],
  controllers: [MemberController],
  exports: [MemberService],
})
export class MemberModule {}
