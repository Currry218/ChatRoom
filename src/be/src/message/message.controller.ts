import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.schema';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() dto: CreateMessageDto): Promise<Message> {
    return this.messageService.create(dto);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get('chatroom/:roomId')
  async findByRoomId(@Param('roomId') roomId: string): Promise<Message[]> {
    return this.messageService.findByRoomId(roomId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMessageDto>,
  ): Promise<Message> {
    return this.messageService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.messageService.remove(id);
    return { message: `Message with id ${id} deleted successfully` };
  }
}
