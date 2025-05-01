# 所有的装饰器

nest 提供了一套模块系统 通过 @Module 声明模块

通过 @Controller、@Injectable 声明其中的 controller 和 provider

provider 可以是任何的 class，
可以通过 useFactory、useValue 等当时声明 provider

注入的方式可以是构造器注入
```
constructor(provate readonly appService: AppService) {}
```

或者属性注入,属性注入要指定注入的 token，可能是 class 也可能是 string
```
@Inject(AppService)
private readonly appService: AppService
```

注入的依赖如果没有的话 创建对象的时候会报错，但是如果他们是可选的 可以用 @Option 声明一下，这样没有对应的 provider 也能正常创建这个对象

如果模块被很多地方都引用，为了方便，可以用 @Global 把它声明为全局的，这样它 exports 的 provider 就可以直接注入了

@Catch 指定处理的异常

@UseFilters @UseGuards @UseInterceptors @UsePipes


@Param @Query 用户获取某个参数

@Post 来表示是一个 post 请求

通过 @Body 获取 body 部分内容，一般用 dto 的 class 来接受请求体里的参数

@Put、@Delete、@Patch、@Options、@Head 装饰器分别接受 put、delete、patch、options、head 请求：

handler 和 class 可以通过 @SetMetadata 指定 metadata

可以在 guard 或者 interceptor 里通过 reflector 取出来


可以通过 @Headers 装饰器去某个请求头或者全部请求头

通过 @Ip 拿到请求的ip

通过 @Session 拿到 session 对象，但是需要安装一个express中间件 express-session

通过 @HostParam 可以拿到host里面的参数 host 可以通过 controller 指定

也可以直接注入 request 对象 使用 @Req 或者 @Request 注入后可以手动取任何参数

也可以注入 @Res 或者 @Response  但是注入后 nest 不会再把 handler 返回值作为响应内容了 需要自己返回 res.end() 
如果不自己返回响应 可以通过 passthrough 参数告诉nest


 如果有多个 handler 处理同一个路由的时候 可以注入 @Next 使用 next() 来跳到下一个 handler

handler 默认是返回200 的状态码  可以通过 @HttpCode 修改

可以通过 @Header 修改 response header

可以通过 @Redirect 装饰器来指定路由重定向的 url：


@Module： 声明 Nest 模块
@Controller：声明模块里的 controller
@Injectable：声明模块里可以注入的 provider
@Inject：通过 token 手动指定注入的 provider，token 可以是 class 或者 string
@Optional：声明注入的 provider 是可选的，可以为空
@Global：声明全局模块
@Catch：声明 exception filter 处理的 exception 类型
@UseFilters：路由级别使用 exception filter
@UsePipes：路由级别使用 pipe
@UseInterceptors：路由级别使用 interceptor
@SetMetadata：在 class 或者 handler 上添加 metadata
@Get、@Post、@Put、@Delete、@Patch、@Options、@Head：声明 get、post、put、delete、patch、options、head 的请求方式
@Param：取出 url 中的参数，比如 /aaa/:id 中的 id
@Query: 取出 query 部分的参数，比如 /aaa?name=xx 中的 name
@Body：取出请求 body，通过 dto class 来接收
@Headers：取出某个或全部请求头
@Session：取出 session 对象，需要启用 express-session 中间件
@HostParm： 取出 host 里的参数
@Req、@Request：注入 request 对象
@Res、@Response：注入 response 对象，一旦注入了这个 Nest 就不会把返回值作为响应了，除非指定 passthrough 为true
@Next：注入调用下一个 handler 的 next 方法
@HttpCode： 修改响应的状态码
@Header：修改响应头
@Redirect：指定重定向的 url
@Render：指定渲染用的模版引擎