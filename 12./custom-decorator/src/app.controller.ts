import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { AppService } from './app.service';
import { Bbb } from './bbb.decorator';
import { Ccc } from './ccc.decorator';

@Controller()
export class AppController {
	constructor(private readonly appService : AppService) { }

	@Get()
	// @SetMetadata('aaa', 'admin')
	@Aaa('admin1')
	@UseGuards(AaaGuard)
	getHello() : string {
		return this.appService.getHello();
	}

	@Bbb('hello2', 'admin2')
	getHello2() {
		return this.appService.getHello()
	}

	@Get('hello4')
	getHello4(@Ccc() c) {
		return c
	}
}