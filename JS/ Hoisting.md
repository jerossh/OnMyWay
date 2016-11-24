## 案发现场

```js
var v='Hello World';
alert(v);
// Hello World
```

这个没有疑问吧，弹出“Hello World”。OK，我们继续。

我们在看一段Code：

```js
var v='Hello World';
(function(){
alert(v);
})()
// Hello World;
```

好了，有意思的来了。接着在看一段下面的代码：

```js
var v='Hello World';
(function(){
alert(v);         // 类似块级作用域形成暂时性死区？
var v='I love you';
})()
// undefinde
```

var 没有块级作用域
```js
var x = 1;
console.log(x); // 1，如果删除上面的赋值过程，undefined
if (true) {
var x = 2;
console.log(x); //2
}
console.log(x);// 2
```

用立即执行函数建立一个作用域

```js
function foo() {
var x = 1;
if (x) {
(function () {
var x = 2;
// 这里有局部作用域，其实就是说函数有独立作用域
}());
}
// x is still 1.
}
```

## 变量提升

我们定义三个变量
```js
(function(){
var a='One';
var b='Two';
var c='Three';
})()
```
实际上是这样子的
```js
(function(){
var a,b,c;
a='One';
b='Two';
c='Three';
})()
```
这个时候就把变量提升了呀。

好，我们现在回到第一段code里面。为什么会报错呢？其实，根据我么根据上面变量提升原件以及js的作用域（块级作用域）的分析，得知 上面代码真正变成如下：

```js
var v='Hello World';
(function(){
var v;
alert(v);
v='I love you';
})()
```

所以，才会提示说“undefined”。

从这里，我们也学习到，我们在写js code 的时候，我么需要把变量放在块级作用域的顶端，比如我在上面所举的例子：var a,b,c;。防止出现意外。

## 函数提升

函数提升是把整个函数都提到前面去。

在我们写js code 的时候，我们有2中写法，一种是函数表达式，另外一种是函数声明方式。我们需要重点注意的是，只有函数声明形式才能被提升。

函数声明方式提升【成功】
```js
function myTest(){
foo();
function foo(){
alert("我来自 foo");
}
}
myTest();
```

函数表达式方式提升【失败】
```js
function myTest(){
foo();
var foo =function foo(){
alert("我来自 foo");
}
}
myTest();
```

总结下：

1. var 赋值，申明提升，但赋值过程不提升
2. 函数申明会提升整个函数，整个也是函数申明比函数表达式高的原因。
