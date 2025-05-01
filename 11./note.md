# ExecutionContext: 切换不同上下文

通过  ArgumentHost 和 ExecutionContext 类  解决  Guard、Interceptor、Exception Filter 跨多种上下文复用问题

ArgumentHost 是用于切换 http、ws、rpc 等上下文类型的，可以根据上下文类型取到对应的 argument

接受到的host参数有一些方法 可以执行方法来切换

guard 和 interceptor 中的参数是 ExecutionContext 类型 


ExecutionContext 是 ArgumentHost 的子类，扩展了 getClass、getHandler 方法 分别用来获取 controller 的class  以及要调用的方法

可以通过 reflector 取出 class 或者 handler 上的 metadata


aaa.guard.ts
```
canActivate(
    context: ExecutionContext,
): boolean | Promise<boolean> | Observable<boolean> {
    // context.
    const requireRoles = this.reflector.get<Role[]>(
        'roles',
            context.getHandler(),
    );
    if (!requireRoles) {
    return true;
}
const { user } = context.switchToHttp().getRequest();
return requireRoles.some((role) => user && user.roles?.includes(role));
}
```