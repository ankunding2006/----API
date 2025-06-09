# js �ű�ʾ��

## 1. ȫ�ֱ����������ʼ��

```javascript
var id; //����ȫ�ֱ���

(function main() {
    if (util.isNullOrUndefined(id))
        //��ʼ��ȫ�ֱ���
        id = 0;

    console.log(id++);
})();
```

## 2. ����ͨѶЭ�鲢��������

```javascript
(function main() {
    var str = receive.getString(); // ��ȡ���յ����ַ���
    receive.write(str); // ��������մ���
    receive.write(" -> ", "red"); // �����ͷ

    var buf = util.hexStringToBytes(str); // �����յ���ʮ�������ַ���ת��Ϊ���顣
    var val1 = util.bytesToInteger(buf, 7, 2); // val1 �������ͳ��Ƚ�����תΪ����
    var val2 = util.bytesToInteger(buf, 9, 2); // val2
    receive.write("val1=" + val1 + " ", "LawnGreen"); //���ת�������ֵ
    receive.write("val2=" + val2, "yellow");
    receive.write("\r\n"); //Print line breaks for easy observation.

    chart.write("val1=" + val1 + "\n"); // ���Ƶ����ν��档 ������val1
    chart.write("val2=" + val2 + "\n"); // ���Ƶ����ν��档 ������val2
})();
```

## 3. ��ȡʱ���ַ���

```javascript
// Format 10:48:59.671 h:m:s.ms
function timeToString() {
    let d = new Date();
    let h = d.getHours().toString().padStart(2, "0");
    let m = d.getMinutes().toString().padStart(2, "0");
    let s = d.getSeconds().toString().padStart(2, "0");
    let ms = d.getMilliseconds().toString().padStart(3, "0");
    return h + ":" + m + ":" + s + "." + ms;
}
```

## 4. ʮ�������ַ���תλʮ����

```javascript
/**************************************
 *
 *   Notes: ʮ�������ַ���ת��Ϊʮ����
 *
 *
 *
 *   ************************************/

{
    let str = receive.getString(); //��ȡ���յ����ַ���
    receive.write(str); //��������մ���
    receive.write(" -> ", "DarkOrange"); //�����ͷ

    let buf = util.hexStringToBytes(str); //תΪ�ֽ�����
    let val = util.bytesToInteger(buf, 0, 2); // תΪ int16;

    console.log(val); //��ӡ���������
    receive.write(val.toString(), "DarkOrange"); //���ת�������ֵ
}
```

## 5. ����תΪ�ַ���

```javascript
val = 10;
let str1 = val.toString(); //תʮ�����ַ��� '10'
let str2 = val.toString(16); //תʮ�������ַ��� 'a'
let str3 = val.toString(8); //ת�˽����ַ��� '12'
let str4 = val.toString(2); //ת�������ַ��� '1010'
let str5 = val.toString(2).padStart(8, "0"); //ת�������ַ������� 8 λ��� 0 '00001010'
```

## 6. ��ӡ����Դ��

```javascript
(function main() {
    console.dir(util.bytesToInteger);
})();
```

? lingguang. All rights reserved.
