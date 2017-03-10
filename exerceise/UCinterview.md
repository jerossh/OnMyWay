1. 现有一数组 a，长度未知，数组每一项的数据类型约定为 Number，请用 JavaScript 实现以下逻辑：（5分）
> 1. 如果 a 的长度为零，则为其添加一个新项，值为 1。
> 2. 如果 a 的长度不为零，则按照 先进先出 的原则，移除一项。
> 3. 评分标准：代码越精简越好，<=30 字符 10 分，<=35 字符 6 分， >35 字符 3 分（空格不算）
```js
a[+a == 0 ? 'push' : 'shift'](1);
```

2. 请阅读以下代码，并把运行结果写到下方注释中。
```js
var func = (function(a) {
    this.a = a;  // this 指向 window
    return function(a) {
        a += this.a;
        console.log(this === window) // true
        return a;
    }
})(function(a, b) {
    return a;
}(1, 2));

func(4)

```
答案
```
5
```
解析
```js
// 自执行函数 返回一个闭包
var func = function () {
    a + this.a;  // this指向 window
    return a;
}
```

3 用 JavaScript 实现以下功能：

- 不使用 loop 生成一个长度 n=100，每一项的数据类型为 Number，值等于其下标的数组 array。

```js
// var arr = [, 2, 3, 5 , 8];
// arr.map(function(e, i, arr) {
//     console.log(i);  // 没有内容也就没有索引的
//    return i;
// });

var createArr = function createArrRec(n, arr) {
    arr = arr || [];
    if (n >= 0) {
        arr[n] = n;
        n--;
        createArr(n, arr);
    }
    return arr;
}
createArr(99);