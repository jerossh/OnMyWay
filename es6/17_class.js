// 1 class 基本用法
// JavaScript语言的传统方法是通过构造函数，定义并生成新对象。下面是一个例子。
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);

// 上面的代码用ES6的“类”改写，就是下面这样。
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
// 另外，方法之间不需要逗号分隔，加了会报错。

// ES6的类，完全可以看作构造函数的另一种写法。
class Point {
  // ...
}
typeof Point // "function"
Point === Point.prototype.constructor // true
// 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。
class Bar {
  doStuff() {
    console.log('stuff');
  }
}
var b = new Bar();
b.doStuff() // "stuff"
// 构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
