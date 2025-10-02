import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.schema';
// import { AuthGuard } from '@nestjs/passport';
import { UpdateMessageDto } from './dto/update-message.dto.ts';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  // @UseGuards(AuthGuard)
  async create(@Body() dto: CreateMessageDto): Promise<Message> {
    return this.messageService.create(dto);
  }

  @Get()
  // // @UseGuards(AuthGuard)
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get('chatroom/:roomId')
  // @UseGuards(AuthGuard)
  async findByRoomId(@Param('roomId') roomId: string): Promise<Message[]> {
    return this.messageService.findByRoomId(roomId);
  }

  @Get(':id')
  // @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMessageDto,
  ): Promise<Message> {
    return this.messageService.update(id, dto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.messageService.remove(id);
    return { message: `Message with id ${id} deleted successfully` };
  }
}
