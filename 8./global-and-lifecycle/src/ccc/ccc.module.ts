import { Module, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';
import { ModuleRef } from '@nestjs/core';

@Module({
	controllers: [CccController],
	providers: [CccService],
})
export class CccModule implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {
	constructor(private moduleRef : ModuleRef) {

	}
	onModuleInit() {
		console.log('cccModule onModuleInit')
	}

	onApplicationBootstrap() {
		console.log('cccModule onApplicationBootstrap')
	}

	onApplicationShutdown() {
		const cccServicer = this.moduleRef.get<CccService>(CccService)
		console.log(cccServicer.findAll(), '------------')
		console.log('-onApplicationShutdown--')
	}
}