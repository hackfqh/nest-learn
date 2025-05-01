全局安装cli npm install -g @nestjs/cli

nest 提供的命令都有
- nest new 项目名  创建新项目
- nest generate 可以生成一些别的代码，比如 controller、service、module 等
	* nest generate module aaa 生成 module 的代码
	* nest generate resource xxx 生成一个模块的代码
- nest build 构建项目的
- nest-cli.json nest相关的配置文件
- nest start 启动命令 每次会重新build 并用node把main.js跑起来
- nest info 查看项目信息，包括系统信息、node、npm和依赖版本