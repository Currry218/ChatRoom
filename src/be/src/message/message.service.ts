import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto.ts';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    const message = new this.messageModel(dto);
    return message.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).exec();
    if (!message)
      throw new NotFoundException(`Message with id ${id} not found`);
    return message;
  }

  async findByRoomId(roomId: string): Promise<Message[]> {
    return this.messageModel.find({ roomId }).lean().exec();
  }

  async getMessagesByRoom(
    roomId: string,
    start = 0,
    end = 25,
  ): Promise<Message[]> {
    return this.messageModel
      .find({ roomId })
      .sort({ createdAt: 1 })
      .skip(start)
      .limit(end - start)
      .lean()
      .exec();
  }

  async update(id: string, dto: UpdateMessageDto): Promise<Message> {
    const updated = await this.messageModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated)
      throw new NotFoundException(`Message with id ${id} not found`);
    return updated;
  }

  // Lazy-load messages
  async findMessagesByRoomId(
    roomId: string,
    start: number,
    end: number,
  ): Promise<Message[]> {
    return this.messageModel
      .find({ roomId })
      .sort({ createdAt: 1 }) // oldest first, you can reverse on frontend if needed
      .skip(start)
      .limit(end - start)
      .lean()
      .exec();
  }

  async findLatestByRoomId(roomId: string): Promise<Message | null> {
    const latestMessage = await this.messageModel
      .findOne({ roomId }) // filter by roomId
      // .select('content')
      // .sort({ createdAt: -1 }) // latest first
      .lean() // plain JS object
      .exec();
    return latestMessage;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.messageModel.findByIdAndDelete(id).exec();
    if (!deleted)
      throw new NotFoundException(`Message with id ${id} not found`);
  }
}
