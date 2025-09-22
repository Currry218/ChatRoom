import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ChatRoom> {
    return this.chatroomService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateChatRoomDto>,
  ): Promise<ChatRoom> {
    return this.chatroomService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.chatroomService.remove(id);
    return { message: `ChatRoom with id ${id} deleted successfully` };
  }
}
