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
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './member.schema';
// import { AuthGuard } from '@nestjs/passport';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  // @UseGuards(AuthGuard)
  async create(@Body() dto: CreateMemberDto): Promise<Member> {
    return this.memberService.create(dto);
  }

  @Get('room/:roomId')
  async getMembersByRoomId(@Param('roomId') roomId: string) {
    return this.memberService.getMembersByRoomId(roomId);
  }

  @Get()
  // @UseGuards(AuthGuard)
  async findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMemberDto>,
  ): Promise<Member> {
    return this.memberService.update(id, dto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<{ member: string }> {
    await this.memberService.remove(id);
    return { member: `Member with id ${id} deleted successfully` };
  }
}
