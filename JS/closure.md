[Don't use closures unless you really need closure  semantics.]不要使用闭包，除非你真正需要它。

[In most cases, non-nested functions are the right way to go.]请使用无嵌套函数。

## 什么是闭包？
```js
function a(){
  var i=0;
  function b(){
           alert(i);       
  }       
  return b;   
}   
var c = a();   
c();
```

全局变量c指定对 函数a的内部函数b的引用；内部函数b的执行需要依赖函数a的资源；

这里就产生一个闭包，使得a在执行完毕并返回后，不会被javascript垃圾回收机制GC回收。

因为这里c还在引用着b，而b依赖着a，故a在使用后，仍然存在于内存中。

简而言之：当函数a的内部函数b被函数a外的一个变量引用的时候，就创建了一个闭包。

## 闭包的应用场景
1.使用闭包代替全局变量

2.函数外或在其他函数中访问某一函数内部的参数

3.在函数执行之前为要执行的函数提供具体参数

4.在函数执行之前为函数提供只有在函数执行或引用时才能知道的具体参数

5.为节点循环绑定click事件，在事件函数中使用当次循环的值或节点，而不是最后一次循环的值或节点

6.暂停执行

7.包装相关功能

#### 1.使用闭包代替全局变量

```js
//全局变量，test1是全局变量
var test1=111
function outer(){
    alert(test1);
}
outer(); //111
alert(test1); //111
```
```js
//闭包，test2是局部变量，这是闭包的目的
//我们经常在小范围使用全局变量，这个时候就可以使用闭包来代替。
(function(){
  var test2=222;
  function outer(){
    alert(test2);
  }
  function test(){
    alert("测试闭包："+test2);
  }
  outer(); //222
  test(); //测试闭包：222
})();
alert(test2); //未定义，这里就访问不到test2
```

#### 2.函数外或在其他函数中访问某一函数内部的参数

为了解决在Ajax callback回调函数中经常需要继续使用主调函数的某一些参数。

```js
function f1(){
    var test=111;
    tmp_test=function(){return test;} //tmp_test是全局变量,这里对test的引用，产生闭包
}

function f2(){
    alert("测试一："+tmp_test());
    var test1=tmp_test();
    alert("测试二："+test1);
}
f1();
f2();
//测试一：111
//测试二：111
alert(tmp_test()); //111
tmp_test=null;
```
