import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
