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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
// import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @UseGuards(AuthGuard)
  async create(@Body() dto: CreateUserDto): Promise<User> {
    if ((dto.avatar = '')) {
      dto.avatar = 'https://cdn-icons-png.flaticon.com/512/10738/10738717.png';
    }

    return this.userService.create(dto);
  }

  @Get()
  // @UseGuards(AuthGuard)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @Get(':uname')
  // @UseGuards(AuthGuard)
  async findByUsername(@Param('uname') uname: string): Promise<User> {
    return this.userService.findByUsername(uname);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateUserDto>,
  ): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<{ user: string }> {
    await this.userService.remove(id);
    return { user: `User with id ${id} deleted successfully` };
  }
}
