import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject()
  private redisServide: RedisService;

  @Get('code')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisServide.set(`captcha_${address}`, code, 60 * 5);
    console.log(address);
    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<div>您的验证码是：${code}</div>`,
    });
    return '发送成功';
  }
}
