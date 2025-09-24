import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from './chatroom.schema';
import { Message } from '../message/message.schema';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
import { MemberService } from '../member/member.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(ChatRoom.name) private chatroomModel: Model<ChatRoom>,
    private memberService: MemberService,
    private messageService: MessageService,
  ) {}

  async create(dto: CreateChatRoomDto): Promise<ChatRoom> {
    const createdRoom = new this.chatroomModel(dto);
    const savedRoom = await createdRoom.save();

    await this.memberService.create({
      roomId: savedRoom._id.toString(),
      username: dto.owner,
      role: 'owner',
    });

    return savedRoom;
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatroomModel.find().exec();
  }

  async findOne(id: string): Promise<ChatRoom> {
    const room = await this.chatroomModel.findById(id).exec();
    if (!room) throw new NotFoundException(`ChatRoom with id ${id} not found`);
    return room;
  }

  // Find all the room that the user is a member
  async findMemberAllRooms(username: string): Promise<any[]> {
    const members = await this.memberService.findByUsername(username);
    if (!members || members.length === 0) return [];

    const roomIds = members.map((m) => m.roomId);

    const rooms = await this.chatroomModel
      .find({ _id: { $in: roomIds } })
      .lean();

    const results = await Promise.all(
      rooms.map(async (room) => {
        const memberInfo = members.find(
          (m) => m.roomId.toString() === room._id.toString(),
        );

        const latestMessage = await this.messageService.findLatestByRoomId(
          room._id.toString(),
        );

        return {
          ...room,
          latestMessage: latestMessage || null,
          memberInfo: memberInfo || null,
        };
      }),
    );

    return results;
  }

  async findRoomById(roomId: string): Promise<ChatRoom | null> {
    return this.chatroomModel.findById(roomId).lean().exec();
  }

  async findMessagesByRoomId(
    roomId: string,
    start: number,
    end: number,
  ): Promise<Message[]> {
    return this.messageService.findMessagesByRoomId(roomId, start, end);
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
    if (!deleted)
      throw new NotFoundException(`ChatRoom with id ${id} not found`);
  }
}
