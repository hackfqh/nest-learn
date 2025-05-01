# 前端到后端传递参数的方式
- url param
	- http://guang.zxg/person/1111
- query
	* 通过 url 中 ？后面的用 & 分隔的字符串传递数据
	* 非英文的字符和一些特殊字符要经过编码，可以使用 encodeURIComponent 的 api 来编码
- form-urlencoded
	* 直接用 form 表单提交数据就是这种
	* 放在了 body 里，然后指定下 content-type 是 application/x-www-form-urlencoded
	* 内容也是 query 字符串，所以也要用 encodeURIComponent 的 api 或者 query-string 库处理下
- form-data
	* 需要指定 content type 为 multipart/form-data
	* 这种方式适合传输文件，而且可以传输多个文件
- json
	* 直接指定content type 为 application/json 

支持静态资源的访问
```js
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', { prefix: '/static'});
  await app.listen(3000);
}
bootstrap();
```
（注意要给 create 方法传入 NestExpressApplication 的泛型参数才有 useStaticAssets这些方法）、

public 是根目录下的文件名称

static 是访问的时候的前缀 即通过 http://localhost:3000/static/index.html 访问 public 目录下的index.html 文件