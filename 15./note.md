# 创建动态模块

有的时候我们希望 import 的时候给这个模块传一些参数，动态生成模块的内容 需要 Dynamic Module 了

可以给模块加一个 register 的静态方法，返回模块定义的对象

nest 约定了三种方法名
- register  用一次模块传一次配置
- forRoot 配置一次模块用多次
- forFeature 用了 forRoot 固定了整体模块，用于局部的时候，可能需要再传一些配置

也可以用 ConfigurableModuleBuilder 来生成。通过 setClassMethodName 设置方法名，通过 setExtras 设置额外的 options 处理逻辑。