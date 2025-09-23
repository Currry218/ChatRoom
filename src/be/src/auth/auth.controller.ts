import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { User } from '../user/user.schema';
import { loginUserDTO } from './dto/login-user.dto';
import { registerUserDTO } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: registerUserDTO): Promise<any> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: loginUserDTO): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() { refresh_token }): Promise<any> {
    return this.authService.refreshToken(refresh_token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfileInfo(req.user);
  }

  @Post('changePassword')
  changePassword(@Body() req: any): Promise<any> {
    console.log(req);
    return this.authService.changePassword(req);
  }

  @Post('createPassword')
  createPassword(@Body() req: any): Promise<any> {
    console.log(req);
    return this.authService.createPassword(req);
  }
}
