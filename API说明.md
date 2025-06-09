# receive 类

跟接收数据相关的属性和方法。

## 属性

| 属性                              | 描述                   |
| --------------------------------- | ---------------------- |
| receive.isFrameStart              | 帧开始标志             |
| receive.isHexDisplay              | 是否 Hex 显示          |
| receive.isSaveToFile              | 是否保存到文件         |
| receive.isPauseAutoScrollToBottom | 是否暂停自动滚动到底部 |
| receive.isAutoBreakFrame          | 是否自动断帧           |
| receive.currentRowIsEmpty         | 接收窗口当前行是否为空 |

## 方法

| 方法                           | 描述                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| receive.get()                  | 参考 receive.getString()                                                                              |
| receive.getString()            | 当前接收的字符串<br>1.使用字符编码转换后的字符串()<br>2.Hex 格式的字符串（当使能十六进制显示时）      |
| receive.getBytes()             | 当前接收到的字节数组（原始数据）                                                                      |
| receive.write(string)          | 向显示窗口写入字符串<br>string 要发送的字符串                                                         |
| receive.write(string,colorStr) | 向显示窗口写入字符串<br>string 要发送的字符串<br>colorStr 颜色字符串。例如 "red" "yellow" "#FF00FF00" |
| receive.clear()                | 清空接收窗口                                                                                          |
| receive.clearLastReceived()    | 清空上次接收数据                                                                                      |

# send 类

跟发送数据相关的属性和方法。

## 属性

| 属性                     | 描述               |
| ------------------------ | ------------------ |
| send.isSendFile          | 是否发送文件       |
| send.isHexSend           | 是否 Hex 发送      |
| send.isTimingSend        | 是否定时发送       |
| send.isDisplaySendString | 是否显示发送字符串 |

## 方法

| 方法                              | 描述                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| send.get()                        | 当前发送的字符串                                                                                                                |
| send.getString()                  | 当前发送的字符串                                                                                                                |
| send.getBytes()                   | 获取当前发送字节数组                                                                                                            |
| send.write(string)                | 发送字符串                                                                                                                      |
| send.write(string,isHexStr)       | 是否是发送 HEX 格式的字符串<br>string 要发送的字符串<br>isHexStr 字符串是否是十六进制样式<br>例如：send.write("AB CD 12",true); |
| send.writeBytes(Array)            | 发送字节数组<br>Array Uint8Array 数组，其他类型会先转换为 Uint8Array 再发送。                                                   |
| send.writeToReceive(string)       | 从发送脚本向接收窗口写字符串<br>建议使用 receive.write(string)                                                                  |
| send.writeToReceive(string,color) | 从发送脚本向接收窗口写字符串<br>建议使用 receive.write(string,colorStr)                                                         |

### send.writeBytes 示例

```javascript
//创建长度为 10 的数组，初始化后并发送
buf = new Uint8Array(10);
for (let i = 0; i < 10; i++) buf[i] = i;
send.writeBytes(buf);

//Array 类型数组
buf = Array(2, 3, 4, "5");
send.writeBytes(buf);
```

# chart 类

绘图控件操作类，包含向绘图控件发送数据的方法

## 方法

| 方法                    | 描述                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chart.write(formatStr)  | 向绘图控件写入数据<br>formatStr 符合绘图协议的字符串<br>例如:<br>chart.write("line1=12.2\n");<br>chart.write("line1=100,line2=200\n");                                                      |
| chart.write(name,datas) | 向绘图控件写入数据<br>name 波形名称<br>datas 波形数据（支持数值，字符串，数组）<br>例如：<br>chart.write("line1",100);<br>chart.write("line1","200");<br>chart.write("line1",[20,"10",50]); |

# console 类

打印调试信息到输出窗口

## 方法

| 方法                       | 描述                                                                              |
| -------------------------- | --------------------------------------------------------------------------------- |
| console.log(obj)           | 打印到输出窗口                                                                    |
| console.dir(obj)           | 格式化打印                                                                        |
| console.error(obj)         | 错误 红色                                                                         |
| console.warn(obj)          | 警告 深绿色                                                                       |
| console.write(obj,,,color) | 打印对象<br>obj,,, 支持多个参数<br>color 最后一个参数，可控制字符颜色             |
| console.time()             | 开始计时                                                                          |
| console.timeEnd()          | 结束计时，并在输出窗口打印所用时间。<br>和 console.time()配合使用统计代码运行时间 |

# util 类

辅助工具类

## 方法

| 方法                                                   | 描述                                                                                                      |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| util.isNull(object)                                    | 是否为 null                                                                                               |
| util.isNullOrUndefined(object)                         | 是否为 null 或未定义                                                                                      |
| util.isUndefined(object)                               | 是否未定义                                                                                                |
| util.timeToString()                                    | 获取时间字符串 h:m:s.ms                                                                                   |
| util.hexStringToBytes(string)                          | 字符串转字节数组<br>string 十六进制格式字符串 "68 65 6C 6C 6F"                                            |
| util.bytesToHexString(bytes, isUpper = false)          | 字节数组转为 16 进制字符串<br>bytes 字节数组<br>isUpper 大写字母(默认小写字母)                            |
| util.bytesToInteger(buf, index, len, bigEndian = true) | 字节数组转整数<br>buf 字节数组<br>index 起始索引<br>len 整数占用字节数量<br>bigEndian 使用大端字节顺序    |
| util.bytesTofloat(buf, index, bigEndian = true)        | IEEE754 float 内存数组(4 字节) 转为 float<br>buf 字节数组<br>index 起始索引<br>bigEndian 使用大端字节顺序 |

## 类型检测

| 方法                             | 描述                     |
| -------------------------------- | ------------------------ |
| util.types.isBoolean(object)     | 是否布尔类型             |
| util.types.isNumber(object)      | 是否数字                 |
| util.types.isString(object)      | 是否字符串               |
| util.types.isFunction(object)    | 是否函数                 |
| util.types.isInt8Array(object)   | 是否 8 位有符号整数数组  |
| util.types.isUint8Array(object)  | 是否 8 位无符号整数数组  |
| util.types.isInt16Array(object)  | 是否 16 位有符号整数数组 |
| util.types.isUint16Array(object) | 是否 16 位无符号整数数组 |

# file 类

文件操作

## 方法

| 方法                          | 描述                                                                       |
| ----------------------------- | -------------------------------------------------------------------------- |
| file.exists(path)             | 确定指定的文件是否存在。<br>path 文件路径                                  |
| file.readText(path)           | 将文件中的所有文本读取到一个字符串中。<br>path 文件路径                    |
| file.writeText(path, string)  | 将字符串写入文件（UTF-8 编码）<br>path 文件路径<br>string 文本字符串       |
| file.appendText(path,str)     | 将字符串添加到文本末尾（UTF-8 编码）<br>path 文件路径<br>string 文本字符串 |
| file.readBytes(path)          | 将文件的内容读入一个字节数组<br>path 文件路径                              |
| file.writeBytes(path, bytes)  | 将字节数组写入文件<br>path 文件路径<br>bytes 字节数组                      |
| file.appendBytes(path, bytes) | 将字符字节数组加到文本末尾<br>path 文件路径<br>bytes 字节数组              |
| file.getTempPath(path, bytes) | 返回当前用户的临时文件夹的路径。                                           |
| file.delete(path)             | 删除指定的文件<br>path 文件路径                                            |

其他
方法 描述
alert(title, message) 显示警告框
title 标题
message 消息
delay(ms) 异步延时 (谨慎使用)
ms 毫秒
sleep(ms) 挂起线程 (谨慎使用)
ms 毫秒
