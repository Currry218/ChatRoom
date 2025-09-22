import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatRoomService } from './chatroom.service';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
import { ChatRoom } from './chatroom.schema';

@Controller('chatroom')
export class ChatRoomController {
  constructor(private readonly chatroomService: ChatRoomService) {}

  @Post()
  async create(@Body() dto: CreateChatRoomDto): Promise<ChatRoom> {
    return this.chatroomService.create(dto);
  }

  @Get()
  async findAll(): Promise<ChatRoom[]> {
    return this.chatroomService.findAll();
  }
}
