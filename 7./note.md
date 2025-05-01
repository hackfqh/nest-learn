providers: [AppService] 是简写

完整的写法是
providers: [{
	provide: AppService,
	useClass: AppService
}]


通过 provide 指定 token，通过 useClass 指定对象的类，Nest 会自动对它做实例化后用来注入。

使用的时候 通过 @Inject 指定注入的 provider 的 token 即可

除了指定 class 外，还可以直接指定一个值，让 IoC 容器来注入

{
    provide: 'person',
    useValue: {
        name: 'aaa',
        age: 20
    }
}

也可以是动态的,使用 useFactory 创建

{
    provide: 'person2',
    useFactory() {
        return {
            name: 'bbb',
            desc: 'cccc'
        }
    }
}

支持通过参数注入别的 provider
{
  provide: 'person3',
  useFactory(person: { name: string }, appService: AppService) {
    return {
      name: person.name,
      desc: appService.getHello()
    }
  },
  inject: ['person', AppService]
}

useFactory 支持异步，nest会等拿到异步结果之后再注入
{
  provide: 'person5',
  async useFactory() {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return {
      name: 'bbb',
      desc: 'cccc'
    }
  },
},
provider 还可以通过 useExisting 来指定别名
{
  provide: 'person4',
  useExisting: 'person2'
}
 person2 的 token 的 provider 起个新的 token 叫做 person4
 注入的时候就使用 person4
 


provide: 字符串或者class
useValue/useClass 提供值