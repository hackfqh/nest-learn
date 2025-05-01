import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import * as sharp from 'sharp';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }

  @Get('compression')
  async compression(
    @Query('path') filePath: string,
    @Query('color', ParseIntPipe) color: number,
    @Res() res: Response,
  ) {
    console.log('filePath', filePath);
    console.log('color', color);
    // 压缩图片
    if (!existsSync(filePath)) {
      return new BadRequestException('文件不存在');
    }

    const data = await sharp(filePath, {
      animated: true,
      limitInputPixels: false,
    })
      .gif({
        colours: color,
      })
      .toBuffer();

    res.set('Content-Disposition', `attachment; filename="dest.gif"`);

    res.send(data);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
