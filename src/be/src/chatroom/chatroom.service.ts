import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from './chatroom.schema';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(ChatRoom.name) private chatroomModel: Model<ChatRoom>,
  ) {}

  async create(dto: CreateChatRoomDto): Promise<ChatRoom> {
    const created = new this.chatroomModel(dto);
    return created.save();
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatroomModel.find().exec();
  }

  async findOne(id: string): Promise<ChatRoom> {
    const room = await this.chatroomModel.findById(id).exec();
    if (!room) throw new NotFoundException(`ChatRoom with id ${id} not found`);
    return room;
  }

  async update(id: string, dto: Partial<CreateChatRoomDto>): Promise<ChatRoom> {
    const updated = await this.chatroomModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated)
      throw new NotFoundException(`ChatRoom with id ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.chatroomModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`ChatRoom with id ${id} not found`);
    }
  }
}
