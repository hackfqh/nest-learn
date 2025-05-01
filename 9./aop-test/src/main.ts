import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before', req.url);
    next();
    console.log('after');
  });

  // app.useGlobalGuards(new LoginGuard());
  // app.useGlobalInterceptors(new TimeInterceptor());

  app.useGlobalPipes(new ValidatePipe());
  await app.listen(3000);
}
bootstrap();
