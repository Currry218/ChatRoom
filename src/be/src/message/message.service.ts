import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    const newMsg = new this.messageModel(dto);
    return newMsg.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findByRoomId(roomId: string): Promise<Message[]> {
    return this.messageModel.find({ roomId }).exec();
  }

  async findOne(id: string): Promise<Message> {
    const msg = await this.messageModel.findById(id).exec();
    if (!msg) throw new NotFoundException(`Message with id ${id} not found`);
    return msg;
  }

  async update(id: string, dto: Partial<CreateMessageDto>): Promise<Message> {
    const updated = await this.messageModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated)
      throw new NotFoundException(`Message with id ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.messageModel.findByIdAndDelete(id).exec();
    if (!deleted)
      throw new NotFoundException(`Message with id ${id} not found`);
  }
}
