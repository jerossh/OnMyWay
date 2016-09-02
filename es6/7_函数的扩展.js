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

// 下面是一个rest参数代替arguments变量的例子。
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}
// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

// 注意，rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
function f(a, ...b, c) {  // 报错
  // ...
}
// 函数的length属性，不包括rest参数。
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1



// 3 扩展运算符
// 扩展运算符（spread）是三个点（...）。
// 它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

// 不在需要 apply 方法

function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args); // ES5的写法
f(...args);           // ES6的写法

// 下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。
// ES5的写法
Math.max.apply(null, [14, 3, 77])
// ES6的写法
Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77);

// 另一个例子是通过push函数，将一个数组添加到另一个数组的尾部。
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
// ES6的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);

// 扩展运算符的应用
// 1）合并数组
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];
// ES5的合并数组
arr1.concat(arr2, arr3);        // [ 'a', 'b', 'c', 'd', 'e' ]
// ES6的合并数组
[...arr1, ...arr2, ...arr3]     // [ 'a', 'b', 'c', 'd', 'e' ]

// 2）与解构赋值结合
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

// 3）函数的返回值
var dateFields = readDateFields(database);
var d = new Date(...dateFields);

// 4）字符串
[...'hello']    // [ "h", "e", "l", "l", "o" ]
// 上面的写法，有一个重要的好处，那就是能够正确识别32位的Unicode字符。
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
// 凡是涉及到操作32位Unicode字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
let str = 'x\uD83D\uDE80y';
str.split('').reverse().join('')  // 中间哪个出错
// 'y\uDE80\uD83Dx'
[...str].reverse().join('')
// 'y\uD83D\uDE80x'

// 5）实现了Iterator接口的对象
// 任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];   // 没有部署Iterator接口，扩展运算符就会报错

// 6）Map和Set结构，Generator函数
// Map结构
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
let arr = [...map.keys()]; // [1, 2, 3]
// Generator函数
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};
[...go()] // [1, 2, 3]
// 如果对没有iterator接口的对象，使用扩展运算符，将会报错。
var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object


// name 属性
function foo() {}
foo.name // "foo"
// 名函数赋值给一个变量
var func1 = function () {};
// ES5
func1.name // ""
// ES6
func1.name // "func1"
// Function构造函数返回的函数实例，name属性的值为“anonymous”。
// bind返回的函数，name属性值会加上“bound ”前缀。
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "


// 箭头函数
var f = v => v;
var sum = (num1, num2) => { return num1 + num2; }
// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。
var getTempItem = id => ({ id: id, name: "Temp" });
// 箭头函数可以与变量解构结合使用。
const full = ({ first, last }) => first + ' ' + last;
// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}
// 箭头函数使得表达更加简洁。
const isEven = n => n % 2 == 0;
const square = n => n * n;

// 箭头函数的一个用处是简化回调函数
// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});
// 箭头函数写法
[1,2,3].map(x => x * x);

// 另一个例子是
// 正常函数写法
var result = values.sort(function (a, b) {
  return a - b;
});
// 箭头函数写法
var result = values.sort((a, b) => a - b);

// 下面是rest参数与箭头函数结合的例子。
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5)    // [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];
headAndTail(1, 2, 3, 4, 5)  // [1,[2,3,4,5]]

// 使用箭头函数，需要注意的点
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作Generator函数。
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
var id = 21;

foo.call({ id: 42 });
// id: 42
// 如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。
// 但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。

// 箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM事件的回调函数封装在一个对象里面。

// 箭头函数里面根本没有自己的this，而是引用外层的this。
// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
// 长期以来，JavaScript语言的this对象一直是一个令人头痛的问题，在对象方法中使用this，必须非常小心。箭头函数”绑定”this，很大程度上解决了这个困扰。
function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}
insert(2).into([1, 3]).after(1); //[1, 2, 3]
// 使用箭头函数改写。
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});
insert(2).into([1, 3]).after(1); //[1, 2, 3]

// 下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);
addThenMult(5)
// 12
const plus1 = a => a + 1;
const mult2 = a => a * 2;
mult2(plus1(5))
// 12


// 函数绑定   ES7


// 尾调用优化
// 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
// 情况一
function f(x){
  let y = g(x);
  return y;
}
// 情况二
function f(x){
  return g(x) + 1;
}
// 情况三
function f(x){
  g(x);
}
// 等同于
function f(x){
  g(x);
  return undefined;
}
// 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
// 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
// 如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。


// 尾递归
// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) // 120
// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1) // 120
// 柯里化
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
const factorial = currying(tailFactorial, 1);
factorial(5) // 120
// 第二种方法就简单多了，就是采用ES6的函数默认值。
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5) // 120


// ES6的尾调用优化只在严格模式下开启，正常模式是无效的。
// 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
// func.arguments：返回调用时函数的参数。
// func.caller：返回调用当前函数的那个函数。

// 正常模式下的优化，用循环模式替换递归
// 蹦床函数 trampoline
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
// 然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
// 蹦床函数并不是真正的尾递归优化，下面的实现才是。
// 完全不懂
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {

    accumulated.push(arguments);
    if (!active) {
      active = true;
      console.log("1: "+accumulated);
      while (accumulated.length) {
        console.log('2: '+accumulated.length);
        value = f.apply(this, accumulated.shift());
        console.log("v:" + value);
      }
      active = false;
      return value;
    }
  };
}
var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 5)
// 100001
