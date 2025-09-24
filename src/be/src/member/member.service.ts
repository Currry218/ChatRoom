import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './member.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<Member>,
    private userService: UserService,
  ) {}

  async create(dto: CreateMemberDto): Promise<Member> {
    // fetch user info
    const user = await this.userService.findByUsername(dto.username);
    if (!user) {
      throw new NotFoundException(`User ${dto.username} not found`);
    }

    // build member with user info
    const member = new this.memberModel({
      roomId: dto.roomId,
      username: dto.username,
      avatar: user.avatar,
      role: dto.role ?? 'member',
      joinedAt: new Date(),
      isNotHere: false,
    });

    return member.save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberModel.findById(id).exec();
    if (!member) throw new NotFoundException(`Member with id ${id} not found`);
    return member;
  }

  async findByUsername(username: string): Promise<Member[]> {
    return this.memberModel.find({ username }).lean().exec();
  }

  async getMembersByRoomId(roomId: string): Promise<Member[]> {
    return this.memberModel.find({ roomId }).lean().exec();
  }

  async update(id: string, dto: Partial<CreateMemberDto>): Promise<Member> {
    const updated = await this.memberModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Member with id ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.memberModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Member with id ${id} not found`);
  }
}
