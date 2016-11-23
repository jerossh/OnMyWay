```js
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```
我的答案：
```
2
5   我瞎，考虑了提升，没考虑覆盖
1
2   Foo()运行过后，原来的 被 Foo()内的覆盖
2   其实也有点不明白，排除法得到的
2   new Foo() 后只能在原型链内找，啊呀我去我好瞎，原型链上是3
1   有点不懂，不过觉得应该是全局里的
```

正确答案：
```
2
4   我虽然记得提升，但忘记了函数表达式会覆盖函数申明，妈的
1
1
2   new (Foo.getName)();
3   (new Foo()).getName()
3   new ((new Foo()).getName)();
```

[ 博文原地址：](http://www.cnblogs.com/xxcanghai/p/5189353.html#commentform)
相关优先级 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
