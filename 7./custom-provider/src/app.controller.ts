import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService : AppService) { }
	@Inject('person') private readonly person : { name : string, age : number }
	@Inject('person2') private readonly person2 : { name : string, desc : string }
	@Inject('person3') private readonly person3 : { name : string, desc : string }

	@Get()
	getHello() : string {
		console.log(this.person, '---this.person---')
		console.log(this.person2, '---this.person2---')
		console.log(this.person3, '---this.person3---')
		return this.appService.getHello();
	}
}