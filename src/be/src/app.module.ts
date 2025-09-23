import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatRoomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { MemberModule } from './member/member.module';

import { User, UserSchema } from './user/user.schema';
import { ChatRoom, ChatRoomSchema } from './chatroom/chatroom.schema';
import { Member, MemberSchema } from './member/member.schema';
import { Message, MessageSchema } from './message/message.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ChatRoom.name, schema: ChatRoomSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Member.name, schema: MemberSchema },
    ]),
    AuthModule,
    UserModule,
    ChatRoomModule,
    MessageModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
