import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from './chatroom.schema';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(ChatRoom.name) private readonly chatroomModel: Model<ChatRoom>,
  ) {}

  async create(createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
    const createdChatRoom = new this.chatroomModel(createChatRoomDto);
    return createdChatRoom.save();
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatroomModel.find().exec();
  }
}
