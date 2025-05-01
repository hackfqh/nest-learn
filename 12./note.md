# 如何自定义装饰器


nest g decorator aaa --no-spec --flat 创建一个装饰器


applyDecorators() 可以在一个装饰器内调用多个装饰器



也可以自定义参数装饰器，使用 createParamDecorator ，装饰器的返回值就是参数的值

接收两个参数 data：传入的参数 ExecutionContext：可以取出 request response 对象

```
export const Ccc = createParamDecorator((data : string, ctx : ExecutionContext) => {
	return 'ccc'
})
```


