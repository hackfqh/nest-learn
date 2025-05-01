import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, {
		provide: 'person',
		useValue: {
			name: 'aaa',
			age: 20
		}
	}, {
			provide: 'person2',
			useFactory() {
				return {
					name: 'bbb',
					desc: 'cccc'
				}
			}
		}, {
			provide: 'person3',
			useFactory(person : { name : string }, appService : AppService) {
				return {
					name: person.name,
					desc: appService.getHello()
				}
			},
			inject: ['person', AppService]
		}],
})
export class AppModule { }