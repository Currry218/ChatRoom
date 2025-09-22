import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      useFactory: (config: ConfigService) => ({
        uri: `mongodb+srv://${config.get<string>('DB_USERNAME')}:${config.get<string>('DB_PASSWORD')}@chatroom.lvpnew9.mongodb.net/`,
        // uri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@chatroom.lvpnew9.mongodb.net/`,

        // connectionName: 'chatroom',
        // dbName: 'chatroom',
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ChatRoom.name, schema: ChatRoomSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Member.name, schema: MemberSchema },
    ]),
    UserModule,
    ChatRoomModule,
    MessageModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private config: ConfigService) {}

  onModuleInit() {
    console.log('✅ ENV CHECK:');
    console.log('DB_USERNAME:', process.env.DB_USERNAME);
    console.log('DB_PASSWORD:', this.config.get('DB_PASSWORD'));
    console.log('DB_NAME:', this.config.get('DB_NAME'));
  }
}
