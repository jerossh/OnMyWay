
// err 迷思
var add = function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    }
  }
  return a + b;
}
// throw 会抛出一个 exception 对象。包含 name 和 message
// 该 exception 对象会被传递入一个 try 语句的 catch 从句


// 扩充类型的功能
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
  console.log(this);
};
// 例子：取整
Number.method('integer', function() {
  return Math[this<0?'ceil':'floor'](this);
});
// 例子：去头尾空白（es5已经有trim）
String.method('trim', function() {
  return this.replace(/^\s+|\s+$/g, '')
})
// 上面的会和es5原生的冲突，所以一个保险的办法
Function.prototype.method = function () {
  if(!this.prototype[name]) {           // 检测环境是否已经有该方法
    this.prototype[name] = func;
  }
}


// 递归的应用，遍历操作
var walk_the_DOM = function walk(node, func) {
  func(node)
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
}
var getElementByAttribute = function (att, value) {
  var result = [];
  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual == 'String' &&  (actual === value || typeof value !== 'String')) {        // typeof value !== 'String' 干嘛用？
      result.push(node)
    }
  })
  return result
}


// 尾递归
var factorial = function factorial(i, a){
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i-1, a*i)
}


// 闭包
// 作用域的好处就是内部函数可以访问外部的参数和变量（除了this 和 arguments）
// 内部函数比外部函数更长的生命周期
// 可以避免被修改
var myObject = (function () {
  var value = 0;
  return {
    increment: function (inc) {
      value += typeof inc === 'number' ? inc: 1;
    },
    getValue: function () {
      return value;
    }
  }
}());
// 闭包例子
var fade = function (node) {
  var level = 1
  var step = function (){
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100)
    }
  }
    setTimeout(step, 100)
}
fade(document.body)
// var for 循环
var add_the_handlers = function (nodes) {
  var helper = function (i) {
    return function (e) {
      alert(i)
    }
  };
  var i;
  for (i=0; i< nodes.length; i++) {
    node[i].onclick = helper(i);
  }
}

// 回调
// 服务器接收到请求最自然写法也许是
request = prepare_the_request();
response = send_resquest_synchronously(request)
display(response)
// 网络上的同步请求导致客户端进入假死状态
// 回调可以解决阻塞问题
request= prepare_the_request()
send_resquest_asynchronously(request, function(response){
  display(response)
})


// module
String.method('deentityify', function () {
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  return function () {
    return this.replace(/&([^&;]+);/g,  function(a, b) {
      var r = entity[b];
      return typeof r === 'string'?r:a;
    })
  }
})
// 模块模式也可以产生安全的对象
var serial_maker = function () {
  var prefix = ""
  var seq = 0
  return {
    set_prefix: function (p) {
      prefix = String(p)
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function () {
      var result = prefix + seq;
      seq += 1
      return result
    }
  }
}
var seqer = serial_maker()
seqer.set_prefix('Q')
seqer.set_seq(1000)
var unique = seqer.gensym()     // 'Q1000'


// 级联，cascade
// return this 是级联的关键


// 柯里化
var add1 = add.curry(1)
document.writeIn(add1(6))
// 扩展一个柯里化方法
Function.method('curry', function () {
  var slice = [].slice,
      args = slice.apply(arguments),
      that = this;
  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)))
  }
})


// 记忆 memorization
// 递归函数 Fibonacci 数列
var fabonacci = function (n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
for (var i = 0; i <= 10; i += 1) {
  document.writeIn('//' + i + ': ' + fibonacci(i))
}
// 调用了11次，但执行了 453次， 其中442次计算刚刚计算过的值
// 我们可以在一个 memo的数组中存储结果，存储可以隐藏在闭包中
var fibonacci = function () {
  var memo = [0, 1]
  var fib = function (n) {
    var result = memo[n]
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2)
      memo[n] = result;
    }
    return result
  }
  return fib
}();
// 还可以做一个通用管理的
var memoizer = function (memo, formula) {
  var recur = function (n) {
    var result = memo[n]
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result
    }
    return result
  }
  return recur   // recur 里面 return  result
}




// 继承  inheritance
// Pseudoclassical
// 当一个函数对象被创建时， Function 构造器产生的函数对象运行类似这样的代码：
this.prototype = {constructor: this}
// 新对象被赋予一个 prototype 属性，他的值一个包含 constructor 属性且属性值为该函数的对象
// prototype 是用来存放特征的
// constructor 属性没什么用， 重要是 prototype对象

// 如果 new 是方法而不是运算符大概会这么执行
Function.method('new', function () {
  var that = Object.create(this.prototype)
  var other = this.apply(that, argument);
  return (typeof other === "object" && other) || that     // 为什么会出现不是对象的情况？
})
