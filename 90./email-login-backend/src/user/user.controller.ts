import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { RedisService } from 'src/redis/redis.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  private redisService: RedisService;

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);

    const { email, code } = loginUserDto;
    const codeInRedis = await this.redisService.get(`captcha_${email}`);

    if (!codeInRedis) {
      throw new UnauthorizedException('验证码已失效');
    }

    if (code !== codeInRedis) {
      throw new UnauthorizedException('验证码错误');
    }

    const user = await this.userService.findUserByEmail(email);

    console.log(user);

    return 'success';
  }
}
