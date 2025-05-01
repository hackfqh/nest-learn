# AOP

Aspect Oriented Programming 面向切片编程的能力

这种透明的加入一些切面逻辑的编程方式就叫做 AOP （面向切面编程）

AOP 的好处是可以把一些通用逻辑分离到切面中，保持业务逻辑的纯粹性，这样切面逻辑可以复用，还可以动态的增删。


Nest 实现AOP的方式有五种，包括 Middleware、Guard、Pipe、Interceptor、ExceptionFilter。


## 中间件 Middleware

分为全局中间件和路由中间件 

全局中间件 
main.ts 文件中
```typescript
app.use(function (req : Request, res : Response, next : NextFunction) {
	console.log('before', req.url)
	next()
	console.log('after')
})
```
路由中间件

先创建一个中间件

nest g middleware log --no-spec --flat

## Guard 守卫
Guard 是路由守卫的意思，可以用于在调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行：

Guard 要实现 CanActivate 接口，实现 canActivate 方法，可以从 context 拿到请求的信息，然后做一些权限验证等处理之后返回 true 或者 false。

创建一个 guard nest g guard login --no-spec --flat

可以在路由前面添加或者是全局添加

```
// 路由前添加
@Get('aaa')
  @UseGuards(LoginGuard)
  aaa(): string {
    console.log('aaa...');
    return 'aaa';
  }
  
// 全局添加 main.ts ，这种方式是手动new的Guard实例，不在Ioc容器
 app.useGlobalGuards(new LoginGuard());
```

还有一种全局的启用方式，是在 AppModule 中声明，这种方式声明的 Guard 在 Ioc 容器里面。可以注入别的 provider,guard文件里面可以注入别的
```
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
```


## Interceptor 拦截器
可以在目标 Controller 方法前后加入一些逻辑

创建 nest g interceptor time --no-spec --flat

interceptor 可以拿到调用的 controller 和 handler：

支持单个路由启用 
```
@Get('bbb')
@UseInterceptors(TimeInterceptor)
```
也支持全局启用
app.useGlobalInterceptors(new TimeInterceptor());
```
{
        provide: APP_INTERCEPTOR,
        useClass: TimeInterceptor,
        },
```


## Pipe 管道
nest g pipe validate --no-spec --flat

可以只对某个参数生效
@Get('ccc')
ccc(@Query('num', ValidatePipe) num: number) {
return num + 1;
}

或者整个 Controller 生效
@Controller()
@UsePipes(ValidatePipe)
export class AppController {

或者全局生效
app.useGlobalPipes(new ValidatePipe());

{
    provide: APP_PIPE,
    useClass: ValidatePipe
}


## ExceptionFilter 
nest g filter test --no-spec --flat

实现 ExceptionFilter 接口，实现 catch 方法，就可以拦截异常了。

拦截什么异常用 @Catch 装饰器来声明，然后在 catch 方法返回对应的响应，给用户更友好的提示。

可以用于某个 handle 某个 controller 以及全局的两种使用方式

## 几种 AOP 机制的顺序
request -> middleware -> Guard -> Interceptor -> Pipe -> handle -> Interceptor -> Exception Filter -> response 