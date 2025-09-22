import { Controller, Get, Post, Body } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.schema';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() dto: CreateMemberDto): Promise<Member> {
    return this.memberService.create(dto);
  }

  @Get()
  async findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }
}
