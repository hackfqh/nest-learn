# Nest 中的 Middleware中间件

用法是 Module 实现 NestModule 的 configure 方法，调用 apply 和 forRoutes 指定什么中间件作用于什么路由。

```typescript
export class AppModule implements NestModule {
	configure(consumer : MiddlewareConsumer) {
		consumer.apply(AaaMiddleware).forRoutes('*')
	}
}
```

 nest 中的中间件是 class 的方式 目的是为了依赖注入
 
 middleware 里有个 next 参数， 是指调用下一个 middleware 
 
 而 Nest 还有个 @Next 装饰器,是指调用下一个 handler
 
 Nest 的 middleware 和 interceptor 都是在请求前后加入一些逻辑的，这俩区别是啥呢？

interceptor 是能从 ExecutionContext 里拿到目标 class 和 handler，进而通过 reflector 拿到它的 metadata 等信息的，这些 middleware 就不可以

再就是 interceptor 里是可以用 rxjs 的操作符来组织响应处理流程的：

 interceptor 更适合处理与具体业务相关的逻辑，而 middleware 适合更通用的处理逻辑。

