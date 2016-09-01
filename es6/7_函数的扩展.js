// 函数参数的默认值
// 在ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法。
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
// 为了解决 undefined 的问题
if (typeof y === 'undefined') {
  y = 'World';
}
// ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。
function log(x, y = 'World') {
  console.log(x, y);
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
// 可以看到，ES6的写法比ES5简洁许多，而且非常自然。下面是另一个例子。
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
var p = new Point();
p // { x: 0, y: 0 }

// 参数变量是默认声明的，所以不能用let或const再次声明。
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

// 与解构赋值默认值结合使用
function foo({x, y = 5}) {
  console.log(x, y);
}
foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined

// 下面是另一个对象的解构赋值默认值的例子。
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}
fetch('http://example.com', {})
// "GET"
fetch('http://example.com')
// 报错

// 再请问下面两种写法有什么差别？
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}
// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]
// x和y都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]
// x有值，y无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
// x和y都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]
m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

// 参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
// 例一
function f(x = 1, y) {
  return [x, y];
}
f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]
// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}
f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
// 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
function foo(x = 5, y = 6) {
  console.log(x, y);
}
foo(undefined, null)
// 5 null

// 函数的length属性
// 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
// 同理，rest参数也不会计入length属性。
(function(...args) {}).length // 0
// 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1


// 作用域
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2) // 2
// 如果调用时，函数作用域内部的变量x没有生成，结果就会不一样。
let x = 1;
function f(y = x) {   // x，还未申明，所以取全局x
  let x = 2;          // 作用域在括号内
  console.log(y);
}
f() // 1
// 下面会报错
function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // ReferenceError: x is not defined
下面也会报错
var x = 1;
function foo(x = x) {     // 前一个 x 是参数，在默认值前执行了，形成暂时性死区。
  // ...
}
foo() // ReferenceError: x is not defined
// 如果参数的默认值是一个函数，该函数的作用域是其声明时所在的作用域。请看下面的例子。
let foo = 'outer';
function bar(func = x => foo) {
  let foo = 'inner';
  console.log(func()); // outer
}
bar();
// 也报错
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar() // ReferenceError: foo is not defined

// 下面是一个更复杂的例子。
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;      // 这个x 和 参数内的x没关系
  y();
  console.log(x);
}
foo() // 3
去掉重新申明就一样
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;        // 去掉重新申明 var
  y();
  console.log(x);
}
foo() // 2


// 应用
// 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
function throwIfMissing() {
  throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()   // Error: Missing parameter
// 另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。
function foo(optional = undefined) { ··· }

// rest参数
// ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。
// rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10
