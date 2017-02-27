在手动内存管理中，开发者有责任释放闲置的内存，这种内存管理方式可能会造成下面几个问题：

- 内存泄露，当从不释放使用过的内存时发生
- 野指针，当对象被释放时，而原来的指针仍继续使用。在其他数据覆盖写入或读取敏感信息时会造成严重的安全问题

## GC 的理念

GC 是一种自动管理应用内存的方法。GC 的工作是回收被未使用的对象所占用的内存。它在 1959 年首次应用于 John McCarthy 创造的 LISP 中。

GC 判断对象不再使用的方式是没有其他的对象引用它们。

#### GC 前的内存

如果你有一些互相引用的对象以及一些没有任何引用的对象。这些没有引用的对象会在 GC 运行 时被回收。

#### GC 后的内存

当 GC 运行起来，无法访问 (没有引用) 的对象会被删除，同时释放掉相应的内存空间。

## GC 的优点

- 防止了野指针 bug
- 不用担心内存的二次释放
- 避免了一些类型的内存泄露

当然，使用 GC 不能解决你所有的问题，而且它也不是内存管理的银弹。

#### 使用 GC 时需要注意的事项

- 性能影响 - GC 会消耗计算能力去决定什么对象应该释放
- 无法预测的停顿 - 现代 GC 实现尝试去避免 stop-the-world 的回收方式

## Node.js GC & 内存管理实践

实践出真知，所以我打算通过几段不同的代码向你展示内存中发生了什么

#### 栈

栈上包含了局部变量和指向堆上对象或指向应用程序控制流程的指针。
在以下示例中，a和b将会被放置在栈中

```js
function add (a, b) {  
  return a + b
}
add(4, 5)
```

#### 堆

堆专门用于存储引用类型对象，如字符串和对象。
在以下示例中，Car 对象将会被放置在栈中

```js
function Car (opts) {  
  this.name = opts.name
}
const LightningMcQueen = new Car({name: 'Lightning McQueen'})
```

在这之后，内存看起来像这个样子

让我们添加更多的 Car 对象，看看内存会是什么样子！

```js
function Car (opts) {  
  this.name = opts.name
}
const LightningMcQueen = new Car({name: 'Lightning McQueen'})  
const SallyCarrera = new Car({name: 'Sally Carrera'})  
const Mater = new Car({name: 'Mater'})
```

如果我们不再使用 Mater，但是重新定义并对它赋值 (如Mater = undefined) 会发生什么？

结果就是，无法从根上访问 Master 对象。所以当下一次 GC 运行时，它将会被释放：

现在我们了解了 GC 预期行为的基础，那让我们看看它在 V8 中是如何实现的。

在我们之前的一篇文章中，我们讨论了 [Node.js GC 方法是如何工作的](https://blog.risingstack.com/finding-a-memory-leak-in-node-js/)，所以我强烈建议去阅读这篇文章。

- 新生区和老生区
- 新生代 (Young Generation)
- Scavenge 和 标记删除

一个真实的例子 — The Meteor Case-Study

在 2013 年，Meteor 的作者宣布了他们碰到的关于内存泄露，问题代码如下所示：

```js
var theThing = null  
var replaceThing = function () {  
  var originalThing = theThing
  var unused = function () {
    if (originalThing)
      console.log("hi")
  }
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage)
    }
  };
};
setInterval(replaceThing, 1000)
```
> Well, the typical way that closures are implemented is that every function object has a link to a dictionary-style object representing its lexical scope. If both functions defined inside replaceThing actually used originalThing, it would be important that they both get the same object, even if originalThing gets assigned to over and over, so both functions share the same lexical environment. Now, Chrome’s V8 JavaScript engine is apparently smart enough to keep variables out of the lexical environment if they aren’t used by any closures - from the Meteor blog.

闭包 unused 一直 持有 originalThing，setInterval 的时候， 上一次运行 originalThing 没有被释放，导致了内存的泄露
