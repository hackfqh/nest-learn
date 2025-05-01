# Module 和 Provider 的循环依赖

如果两个模块中直接互相引用会报错

可以单独创建两个 Module 然后再让两者关联起来
用 forwardRef 的方式



```typescript
imports: [
	forwardRef(() => AaaModule)
]
```


除了 Module 和 Module 之间会循环依赖以外，provider 之间也会

可以通过 @Inject 手动指定注入的 token ，同时使用 forwardRef 的方式注入

constructor(@Inject(forwardRef(() => CccService)) private cccService : CccService) { }


原理就是nest 会先创建 Module、Provider, 之后再把引用转发到对方 也就是 forward ref