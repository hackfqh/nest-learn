# 全局模块和生命周期

## 全局模块
常用的引入module的方式
在 aaaModule 导出 exports: [AaaService]
在 bbbModule 导入 imports: [AaaModule],
之后就可以在 bbbService 中注入使用了 

```typescript
onstructor(private aaaService : AaaService) {

}
```

可以通过 @Global() 将 AaaModule 声明为全局的

在 bbbModule 中就不需要导入 直接可以使用了 

全局模块尽量少用 不然注入的很多 provider 都不知道来源 降低代码的可维护性

## 声明周期
先调用每个模块的 controller、provider 中的方法 再调用 module 中的方法、

onModuleInit -> onApplicationBootstrap

onModuleDestroy -> beforeApplicationShutdown(signal) -> onApplicationShutdown
beforeApplicationShutdown 是可以拿到 signal 系统信号的，

onApplicationShutdown 里面一般都是通过 moduleRef 取出一些 provider 来销毁，比如关闭连接
```js
import { ModuleRef } from '@nestjs/core';

constructor(private moduleRef: ModuleRef)

onApplicationShutdown() {
	const cccServicer = this.moduleRef.get<CccService>(CccService)
	console.log(cccServicer.findAll(), '------------')
	console.log('-onApplicationShutdown--')
}
