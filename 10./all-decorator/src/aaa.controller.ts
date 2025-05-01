import {
  Controller,
  Get,
  Header,
  HostParam,
  HttpCode,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  @Get('bbb')
  hello(@HostParam('host') host) {
    return host;
  }

  @Get('ccc')
  ccc(@Req() req: Request) {
    console.log(req.hostname);
    console.log(req.url);
  }

  @Get('ddd')
  ddd(@Res({ passthrough: true }) res: Response) {
    // res.end('ddd');
    return 'ddd';
  }

  @Get('fff')
  @HttpCode(222)
  fff() {
    return 'fff';
  }

  @Get('ggg')
  @Header('aa', 'bb')
  ggg() {
    return 'ggg';
  }

  @Get('hhh')
  @Redirect('http://juejin.cn')
  hhh() {
    return 'hhh';
  }
}
