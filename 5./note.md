 IoC 的实现思路。

它有一个放对象的容器，程序初始化的时候会扫描 class 上声明的依赖关系，然后把这些 class 都给 new 一个实例放到容器里。
创建对象的时候，还会把它们依赖的对象注入进去

@Injectable，可以被注入也是可以注入到别的对象的

@Controller，只需要被注入，

构造器注入
`constructor(private readonly appService: AppService) {}`

属性注入
```
@Inject(AppService)
private appService: AppService
```

module 文件中 通过@Module 声明模块
controllers 是控制器，只能被注入
providers 里可以被注入，也可以注入别的对象