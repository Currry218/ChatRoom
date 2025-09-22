import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './member.schema';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}

  async create(dto: CreateMemberDto): Promise<Member> {
    const newMsg = new this.memberModel(dto);
    return newMsg.save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  async findOne(id: string): Promise<Member> {
    const msg = await this.memberModel.findById(id).exec();
    if (!msg) throw new NotFoundException(`Member with id ${id} not found`);
    return msg;
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
