import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  // UseGuards,
  Query,
} from '@nestjs/common';
import { ChatRoomService } from './chatroom.service';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
import { ChatRoom } from './chatroom.schema';
// import { AuthGuard } from '../auth/auth.guard';

@Controller('chatroom')
export class ChatRoomController {
  constructor(private readonly chatroomService: ChatRoomService) {}

  @Post()
  async create(@Body() dto: CreateChatRoomDto): Promise<ChatRoom> {
    return this.chatroomService.create(dto);
  }

  @Get()
  // @UseGuards(AuthGuard)
  async findAll(): Promise<ChatRoom[]> {
    return this.chatroomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ChatRoom> {
    return this.chatroomService.findOne(id);
  }

  @Get(':id/messages')
  async getMessages(
    @Param('id') roomId: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ): Promise<any> {
    const s = parseInt(start) || 0;
    const e = parseInt(end) || 25;
    return this.chatroomService.findMessagesByRoomId(roomId, s, e);
  }

  @Get('chatroom-latest/:username')
  async findMemberAllRooms(
    @Param('username') username: string,
  ): Promise<ChatRoom[]> {
    return this.chatroomService.findMemberAllRooms(username);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: CreateChatRoomDto,
  ): Promise<ChatRoom> {
    return this.chatroomService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.chatroomService.remove(id);
    return { message: `ChatRoom with id ${id} deleted successfully` };
  }
}
