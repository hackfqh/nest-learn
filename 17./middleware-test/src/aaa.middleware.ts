import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Injectable()
export class AaaMiddleware implements NestMiddleware {

	constructor(private readonly appService : AppService) { }

	use(req : Request, res : Response, next : () => void) {
		console.log('before')
		console.log(this.appService.getHello(), '------getHello-------')
		next();
		console.log('next')
	}
}