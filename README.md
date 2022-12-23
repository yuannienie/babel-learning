# babel-learning


## 1. parameters-insert-plugin
我们经常会打印一些日志来辅助调试，但是有的时候会不知道日志是在哪个地方打印的。希望通过 babel 能够自动在 console.log 等 api 中插入文件名和行列号的参数，方便定位到代码。

## 2. autho-logger-plugin
埋点只是在函数里面插入了一段代码，这段代码不影响其他逻辑，这种函数插入不影响逻辑的代码的手段叫做函数插桩。
实现功能：
1. 自动引入 traker 模块，如果引入过就跳过
2. 在每个函数调用首部自动埋点，调用 tracker 模块