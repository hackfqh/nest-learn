# Metadata 和 Reflector

Reflect.defineMetadata 和 Reflect.getMetadata 分别用于设置和获取某个类的元数据，如果最后传入了属性名，还可以单独为某个属性设置元数据

如果给类或者类的静态属性添加元数据，那就保存在类上，如果给实例属性添加元数据，那就保存在对象上，用类似 [[metadata]] 的 key 来存的

Nest 的实现原理就是通过装饰器给 class 或者对象添加元数据，然后初始化的时候取出这些元数据，进行依赖的分析，然后创建对应的实例对象就可以了


创建的对象需要知道构造器的参数  ts 有一个编译选项叫做 emitDecoratorMetadata，开启它就会自动添加一些元数据

通过装饰器给 class 或者对象添加 metadata，并且开启 ts 的 emitDecoratorMetadata 来自动添加类型相关的 metadata，然后运行的时候通过这些元数据来实现依赖的扫描，对象的创建等等功能。

nest 还提供了 @SetMetadata 的装饰器让我们可以给 class、method 添加一些 metadata：


可以通过 reflector 获取到添加的 metadata 值
```typescript
@Inject(Reflector)
private reflector : Reflector
```
