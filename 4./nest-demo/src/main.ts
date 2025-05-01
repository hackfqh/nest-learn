import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	// 支持静态资源的访问
	app.useStaticAssets('public', { prefix: '/static' })
	await app.listen(3000);
}
bootstrap();