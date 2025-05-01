import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(user);
    console.log(foundUser, '----登录成功拿到的用户信息----- ');
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        id: foundUser.id,
        username: foundUser.username,
      });
      res.setHeader('token', token);
      return '登录成功';
    } else {
      return '登录失败';
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return this.userService.register(user);
  }
}
