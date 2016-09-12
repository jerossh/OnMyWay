
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
