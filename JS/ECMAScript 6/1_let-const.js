// 只在代码块有效
{
  let a = 10;
  var b = 1;
}
a     // VM119:5 Uncaught ReferenceError: a is not defined
b     // 1
// 梨子
for (let i = 0; i < arr.length; i++) {}
console.log(i);   // VM128:1 Uncaught ReferenceError: arr is not defined
// 不存在变量提升

// 暂时性死区（temporal dead zone，简称TDZ）
// 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
// “暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
typeof x; // ReferenceError
let x;
// 作为比较，没有申明反而不会报错
typeof undeclared_variable // "undefined"

// 不允许重复声明
function () {
  let a = 10;
  var a = 1;  // 报错
}
function () {
  let a = 10;
  let a = 1;  // 报错
}
// 函数内也不能重新申明
function func(arg) {
  let arg; // 报错
}
// 另外的块级作用域就不会
function func(arg) {
  {
    let arg; // 不报错
  }
}


// ES6的块级作用域
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
// ES6允许块级作用域的任意嵌套。
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
// 块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了
// IIFE写法
(function () {
  var tmp = ...;
  ...
}());
// 块级作用域写法
{
  let tmp = ...;
  ...
}

// 块级作用域与函数声明
// ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
// ES6引入了块级作用域，明确允许在块级作用域之中声明函数。
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }
  f();
}());
// es 5: I am inside!
// es 6: I am outside!
// chrome: VM95:8 Uncaught TypeError: f is not a function
// 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
// 函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}

// 另外，还有一个需要注意的地方。ES6的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。
'use strict';
if (true) {
  function f() {}   // 正常
}

'use strict';
if (true)
  function f() {}   // 报错

// 自己小测试
let a = 1
{
  a = 2
}
a   // 2
// 测试2
let a = 1
{
 let a = 2
}
a   // 1


// const声明一个只读的常量。一旦声明，常量的值就不能改变。
// const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
const PI = 3.1415;
PI                // 3.1415
PI = 3;           // TypeError: Assignment to constant variable.
// 只申明二不赋值也报错
const foo;        // SyntaxError: Missing initializer in const declaration
// 同样的块级作用域
if (true) {
  const MAX = 5;
}
MAX // Uncaught ReferenceError: MAX is not defined
// 同样存在暂时性死区

// 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。
const foo = {};
foo.prop = 123;
foo.prop          // 123
foo = {};         // Uncaught TypeError: Assignment to constant variable.
// 梨子2
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错

// 如果真的想将对象冻结，应该使用Object.freeze方法。
const foo = Object.freeze({});
foo.prop = 123;         // 常规模式时，下面一行不起作用；严格模式时，该行会报错
// 下面是一个将对象彻底冻结的函数。


// ES5只有两种声明变量的方法：var命令和function命令
var v
function f() {}
// ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6一共有6种声明变量的方法。
let  l = 0
const c = 0

// 全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js指的是global对象。ES5之中，全局对象的属性与全局变量是等价的。
// 未声明的全局变量，自动成为全局对象window的属性，这被认为是JavaScript语言最大的设计败笔之一。
// 这样的设计带来了两个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道，其次程序员很容易不知不觉地就创建了全局变量（比如打字出错）。
// 另一方面，从语义上讲，语言的顶层对象是一个有实体含义的对象，也是不合适的。
// var命令和function命令声明的全局变量，依旧是全局对象的属性；
// 另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩。
var a = 1;
// 如果在Node的REPL环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined

// 完
