# receive ��

������������ص����Ժͷ�����

## ����

| ����                              | ����                   |
| --------------------------------- | ---------------------- |
| receive.isFrameStart              | ֡��ʼ��־             |
| receive.isHexDisplay              | �Ƿ� Hex ��ʾ          |
| receive.isSaveToFile              | �Ƿ񱣴浽�ļ�         |
| receive.isPauseAutoScrollToBottom | �Ƿ���ͣ�Զ��������ײ� |
| receive.isAutoBreakFrame          | �Ƿ��Զ���֡           |
| receive.currentRowIsEmpty         | ���մ��ڵ�ǰ���Ƿ�Ϊ�� |

## ����

| ����                           | ����                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| receive.get()                  | �ο� receive.getString()                                                                              |
| receive.getString()            | ��ǰ���յ��ַ���<br>1.ʹ���ַ�����ת������ַ���()<br>2.Hex ��ʽ���ַ�������ʹ��ʮ��������ʾʱ��      |
| receive.getBytes()             | ��ǰ���յ����ֽ����飨ԭʼ���ݣ�                                                                      |
| receive.write(string)          | ����ʾ����д���ַ���<br>string Ҫ���͵��ַ���                                                         |
| receive.write(string,colorStr) | ����ʾ����д���ַ���<br>string Ҫ���͵��ַ���<br>colorStr ��ɫ�ַ��������� "red" "yellow" "#FF00FF00" |
| receive.clear()                | ��ս��մ���                                                                                          |
| receive.clearLastReceived()    | ����ϴν�������                                                                                      |

# send ��

������������ص����Ժͷ�����

## ����

| ����                     | ����               |
| ------------------------ | ------------------ |
| send.isSendFile          | �Ƿ����ļ�       |
| send.isHexSend           | �Ƿ� Hex ����      |
| send.isTimingSend        | �Ƿ�ʱ����       |
| send.isDisplaySendString | �Ƿ���ʾ�����ַ��� |

## ����

| ����                              | ����                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| send.get()                        | ��ǰ���͵��ַ���                                                                                                                |
| send.getString()                  | ��ǰ���͵��ַ���                                                                                                                |
| send.getBytes()                   | ��ȡ��ǰ�����ֽ�����                                                                                                            |
| send.write(string)                | �����ַ���                                                                                                                      |
| send.write(string,isHexStr)       | �Ƿ��Ƿ��� HEX ��ʽ���ַ���<br>string Ҫ���͵��ַ���<br>isHexStr �ַ����Ƿ���ʮ��������ʽ<br>���磺send.write("AB CD 12",true); |
| send.writeBytes(Array)            | �����ֽ�����<br>Array Uint8Array ���飬�������ͻ���ת��Ϊ Uint8Array �ٷ��͡�                                                   |
| send.writeToReceive(string)       | �ӷ��ͽű�����մ���д�ַ���<br>����ʹ�� receive.write(string)                                                                  |
| send.writeToReceive(string,color) | �ӷ��ͽű�����մ���д�ַ���<br>����ʹ�� receive.write(string,colorStr)                                                         |

### send.writeBytes ʾ��

```javascript
//��������Ϊ 10 �����飬��ʼ���󲢷���
buf = new Uint8Array(10);
for (let i = 0; i < 10; i++) buf[i] = i;
send.writeBytes(buf);

//Array ��������
buf = Array(2, 3, 4, "5");
send.writeBytes(buf);
```

# chart ��

��ͼ�ؼ������࣬�������ͼ�ؼ��������ݵķ���

## ����

| ����                    | ����                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chart.write(formatStr)  | ���ͼ�ؼ�д������<br>formatStr ���ϻ�ͼЭ����ַ���<br>����:<br>chart.write("line1=12.2\n");<br>chart.write("line1=100,line2=200\n");                                                      |
| chart.write(name,datas) | ���ͼ�ؼ�д������<br>name ��������<br>datas �������ݣ�֧����ֵ���ַ��������飩<br>���磺<br>chart.write("line1",100);<br>chart.write("line1","200");<br>chart.write("line1",[20,"10",50]); |

# console ��

��ӡ������Ϣ���������

## ����

| ����                       | ����                                                                              |
| -------------------------- | --------------------------------------------------------------------------------- |
| console.log(obj)           | ��ӡ���������                                                                    |
| console.dir(obj)           | ��ʽ����ӡ                                                                        |
| console.error(obj)         | ���� ��ɫ                                                                         |
| console.warn(obj)          | ���� ����ɫ                                                                       |
| console.write(obj,,,color) | ��ӡ����<br>obj,,, ֧�ֶ������<br>color ���һ���������ɿ����ַ���ɫ             |
| console.time()             | ��ʼ��ʱ                                                                          |
| console.timeEnd()          | ������ʱ������������ڴ�ӡ����ʱ�䡣<br>�� console.time()���ʹ��ͳ�ƴ�������ʱ�� |

# util ��

����������

## ����

| ����                                                   | ����                                                                                                      |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| util.isNull(object)                                    | �Ƿ�Ϊ null                                                                                               |
| util.isNullOrUndefined(object)                         | �Ƿ�Ϊ null ��δ����                                                                                      |
| util.isUndefined(object)                               | �Ƿ�δ����                                                                                                |
| util.timeToString()                                    | ��ȡʱ���ַ��� h:m:s.ms                                                                                   |
| util.hexStringToBytes(string)                          | �ַ���ת�ֽ�����<br>string ʮ�����Ƹ�ʽ�ַ��� "68 65 6C 6C 6F"                                            |
| util.bytesToHexString(bytes, isUpper = false)          | �ֽ�����תΪ 16 �����ַ���<br>bytes �ֽ�����<br>isUpper ��д��ĸ(Ĭ��Сд��ĸ)                            |
| util.bytesToInteger(buf, index, len, bigEndian = true) | �ֽ�����ת����<br>buf �ֽ�����<br>index ��ʼ����<br>len ����ռ���ֽ�����<br>bigEndian ʹ�ô���ֽ�˳��    |
| util.bytesTofloat(buf, index, bigEndian = true)        | IEEE754 float �ڴ�����(4 �ֽ�) תΪ float<br>buf �ֽ�����<br>index ��ʼ����<br>bigEndian ʹ�ô���ֽ�˳�� |

## ���ͼ��

| ����                             | ����                     |
| -------------------------------- | ------------------------ |
| util.types.isBoolean(object)     | �Ƿ񲼶�����             |
| util.types.isNumber(object)      | �Ƿ�����                 |
| util.types.isString(object)      | �Ƿ��ַ���               |
| util.types.isFunction(object)    | �Ƿ���                 |
| util.types.isInt8Array(object)   | �Ƿ� 8 λ�з�����������  |
| util.types.isUint8Array(object)  | �Ƿ� 8 λ�޷�����������  |
| util.types.isInt16Array(object)  | �Ƿ� 16 λ�з����������� |
| util.types.isUint16Array(object) | �Ƿ� 16 λ�޷����������� |

# file ��

�ļ�����

## ����

| ����                          | ����                                                                       |
| ----------------------------- | -------------------------------------------------------------------------- |
| file.exists(path)             | ȷ��ָ�����ļ��Ƿ���ڡ�<br>path �ļ�·��                                  |
| file.readText(path)           | ���ļ��е������ı���ȡ��һ���ַ����С�<br>path �ļ�·��                    |
| file.writeText(path, string)  | ���ַ���д���ļ���UTF-8 ���룩<br>path �ļ�·��<br>string �ı��ַ���       |
| file.appendText(path,str)     | ���ַ�����ӵ��ı�ĩβ��UTF-8 ���룩<br>path �ļ�·��<br>string �ı��ַ��� |
| file.readBytes(path)          | ���ļ������ݶ���һ���ֽ�����<br>path �ļ�·��                              |
| file.writeBytes(path, bytes)  | ���ֽ�����д���ļ�<br>path �ļ�·��<br>bytes �ֽ�����                      |
| file.appendBytes(path, bytes) | ���ַ��ֽ�����ӵ��ı�ĩβ<br>path �ļ�·��<br>bytes �ֽ�����              |
| file.getTempPath(path, bytes) | ���ص�ǰ�û�����ʱ�ļ��е�·����                                           |
| file.delete(path)             | ɾ��ָ�����ļ�<br>path �ļ�·��                                            |

����
���� ����
alert(title, message) ��ʾ�����
title ����
message ��Ϣ
delay(ms) �첽��ʱ (����ʹ��)
ms ����
sleep(ms) �����߳� (����ʹ��)
ms ����
