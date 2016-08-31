// ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
// 以前
var a = 1;
var b = 2;
var c = 3;
// ES6允许写成下面这样。
var [a, b, c] = [1, 2, 3];
// 梨子1
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3
// 梨子2
let [ , , third] = ["foo", "bar", "baz"];
third // "baz"
// 梨子3
let [x, , y] = [1, 2, 3];
x // 1
y // 3
// 梨子4， 注意 ...
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]
// 梨子5， ...z 是一个数组
let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
// 如果解构不成功，变量的值为 undefined

// 不完全解构
let [x, y] = [1, 2, 3];
x // 1
y // 2
let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

// 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

// 解构赋值不仅适用于var命令，也适用于let和const命令。
var [v1, v2, ..., vN ] = array;
let [v1, v2, ..., vN ] = array;
const [v1, v2, ..., vN ] = array;
// 对于Set结构，也可以使用数组的解构赋值。
let [x, y, z] = new Set(["a", "b", "c"]);
x // "a"
// 事实上，只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
var [first, second, third, fourth, fifth, sixth] = fibs();
third

var [foo = true] = [];
foo // true


// 解构赋值允许指定默认值。
[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
// 上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。
var [x = 1] = [undefined];
x // 1
var [x = 1] = [null];
x // null
// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
function f() {
  console.log('aaa');
}
let [x = f()] = [1];
// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError，y还没申明



// 对象的解构赋值
var { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
// 属性同名，才能取到正确的值
var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
// 如果变量名与属性名不一致，必须写成下面这样
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
// 注意obj就是个对象而已
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
// 实际上，是这样子解构的
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };  // 前面那个值，没有引号
// 真正被赋值的是后者，而不是前者。下面 foo是 undefined
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined

// 采用这种写法时，变量的声明和赋值是一体的，let 和 const 不能重新申明的
let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"
let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"
// 下面不重新申明就是正确的
let foo;
({foo} = {foo: 1}); // 成功
let baz;
({bar: baz} = {bar: 1}); // 成功

// 和数组一样，解构也可以用于嵌套结构的对象。
var obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
var { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
// 注意，这时p是模式，不是变量，因此不会被赋值。
// 模式是啥？？？？？？？
var node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
var { loc: { start: { line }} } = node;
line // 1
loc  // error: loc is undefined      模式，不会被赋值
start // error: start is undefined    模式，不会被赋值
// 下面是嵌套赋值的例子。
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj // {prop:123}
arr // [true]
// 对象的解构也可以指定默认值。
var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1
y // 5
var {x:y = 3} = {};
y // 3
var {x:y = 3} = {x: 5};
y // 5
var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
// null 也会取代默认值
var {x = 3} = {x: undefined};
x // 3
var {x = 3} = {x: null};
x // null

// 如果解构失败，变量的值等于undefined。

// 报错
var {foo: {bar}} = {baz: 'baz'};
// 左边的值是一个未命名的对象，是undefined

// 如果要将一个已经声明的变量用于解构赋值，必须非常小心。
// 错误的写法
var x;
{x} = {x: 1};     // SyntaxError: syntax error
// 上面代码的写法会报错，因为JavaScript引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免JavaScript将其解释为代码块，才能解决这个问题。
// 正确的写法
var x;
({x} = {x: 1});


// 解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
({} = [true, false]);
({} = 'abc');
({} = []);

// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let { log, sin, cos } = Math;
log      // function log(){}
// 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
var arr = [1, 2, 3];
var {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3


// 字符串的解构赋值
// 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length : len} = 'hello';
len // 5

// 数值和布尔值的解构赋值
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true
// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError


// 函数参数的解构赋值
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3
// 另一个梨子
[[1, 2], [3, 4]].map(([a, b]) => a + b);

// 函数参数的解构也可以使用默认值。
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
// 注意，下面的写法会得到不一样的结果。
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
// undefined就会触发函数参数的默认值。
[1, undefined, 3].map((x = 'yes') => x);



// 圆括号问题
// 解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
// 由此带来的问题是，如果模式中出现圆括号怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
// 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

// 不能使用圆括号的情况
// 1）变量声明语句中，不能带有圆括号。
// 全部报错
var [(a)] = [1];
var {x: (c)} = {};
var ({x: c}) = {};
var {(x: c)} = {};
var {(x): c} = {};
var { o: ({ p: p }) } = { o: { p: 2 } };
// 2）函数参数中，模式不能带有圆括号。
function f([(z)]) { return z; }  // 报错
// 3）赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
// 报错
[({ p: a }), { x: c }] = [{}, {}];

// 可以使用圆括号的情况
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
// 上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，
// 跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。


// 用途
// 1） 交换变量的值
[x, y] = [y, x];
// 2）从函数返回多个值
// 返回一个数组
function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();

// 3）函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});

// 4）提取JSON数据
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]

// 5）函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
// 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

// 6）遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 7）输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");
