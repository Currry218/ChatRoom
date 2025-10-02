import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { loginUserDTO } from './dto/login-user.dto';
import { registerUserDTO } from './dto/register-user.dto';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UsersModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerUserDto: registerUserDTO): Promise<any> {
    const hashPassword = await this.hashPassword(registerUserDto.password);

    const user = await this.UsersModel.findOne({
      username: registerUserDto.username,
    }).exec();
    if (user) throw new UnauthorizedException('Error: Account exists');

    const userEmail = await this.UsersModel.findOne({
      email: registerUserDto.email,
    }).exec();
    if (userEmail) throw new UnauthorizedException('Error: Email exists');

    console.log(registerUserDto);

    const newUser = await this.UsersModel.create({
      username: registerUserDto.username,
      email: registerUserDto.email,
      password: hashPassword,
      avatar: registerUserDto.avatar,
      sex: registerUserDto.sex,
    });
    console.log(newUser);
    const payload = {
      _id: newUser._id.toString(),
      username: newUser.username,
    };
    return this.generateToken(payload);
  }

  async login(loginUserDto: loginUserDTO): Promise<any> {
    const user = await this.UsersModel.findOne({
      username: loginUserDto.username,
    }).exec();
    if (!user) throw new UnauthorizedException('Error: Account not found');

    const checkPass = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!checkPass)
      throw new UnauthorizedException('Error: Password incorrect');

    const payload = {
      _id: user._id.toString(),
      username: user.username,
    };
    return this.generateToken(payload);
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const checkExistToken = await this.UsersModel.findOne({
        username: verify.username,
        refresh_token,
      });
      if (!checkExistToken) {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }

      return this.generateToken({
        _id: verify._id.toString(),
        username: verify.username,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Invalid refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async generateToken(payload: { _id: string; username: string }) {
    const access_token = await this.jwtService.signAsync(payload);

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN') || '7d',
    });

    await this.UsersModel.findOneAndUpdate(
      { username: payload.username },
      { refresh_token: refresh_token },
    );

    return { access_token, refresh_token };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds =
      Number(this.configService.get<number>('SALT_ROUND')) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async getProfileInfo(req: any): Promise<any> {
    const user = await this.UsersModel.findOne({ username: req.username })
      .select('username email avatar')
      .exec();

    return user;
  }

  // async changePassword(req: any): Promise<any> {
  //   const user = await this.UsersModel.findOne({ email: req.email })
  //     .select('password')
  //     .exec();
  //   if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

  //   const isMatch = await bcrypt.compare(req.currentPassword, user.password);
  //   if (user.password && !isMatch) {
  //     throw new HttpException(
  //       'Current password is incorrect',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const hashedNewPassword = await this.hashPassword(req.newPassword);
  //   await this.UsersModel.findOneAndUpdate(
  //     { email: req.email },
  //     { password: hashedNewPassword },
  //   );
  //   return;
  // }

  // async createPassword(req: any): Promise<any> {
  //   const user = await this.UsersModel.findOne({ email: req.email })
  //     .select('password')
  //     .exec();
  //   if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

  //   const hashedNewPassword = await this.hashPassword(req.newPassword);
  //   await this.UsersModel.findOneAndUpdate(
  //     { email: req.email },
  //     { password: hashedNewPassword },
  //   );
  //   return;
  // }
}
