// ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。
// 它是JavaScript语言的第七种数据类型，前六种是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
// Symbol值通过Symbol函数生成。
let s = Symbol();
typeof s // "symbol"
// 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。
// 如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。
// 注意，Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false

// Symbol值不能与其他类型的值进行运算，会报错。
var sym = Symbol('My symbol');
"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string

// 但是，Symbol值可以显式转为字符串。
var sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
// 另外，Symbol值也可以转为布尔值，但是不能转为数值。
var sym = Symbol();
Boolean(sym) // true
!sym  // false
if (sym) {
  // ...
}
Number(sym) // TypeError
sym + 2 // TypeError


// 2 作为属性名的Symbol
// 由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

// 同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中。
let s = Symbol();
let obj = {
  [s]: function (arg) { ... }
};
obj[s](123);
// 采用增强的对象写法，上面代码的obj对象可以写得更简洁一些。
let obj = {
  [s](arg) { ... }
};

// 3 实例：消除魔术字符串
function getArea(shape, options) {
  var area = 0;
  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }
  return area;
}
getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
// 上面代码中，字符串“Triangle”就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。
var shapeType = {
  triangle: 'Triangle'
};
function getArea(shape, options) {
  var area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}
getArea(shapeType.triangle, { width: 100, height: 100 });
// 上面代码中，我们把“Triangle”写成shapeType对象的triangle属性，这样就消除了强耦合。


// 属性名的遍历
// Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值。
var obj = {};
var a = Symbol('a');
var b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
var objectSymbols = Object.getOwnPropertySymbols(obj);
objectSymbols
// [Symbol(a), Symbol(b)]

// 由于以Symbol值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。



// 5 Symbol.for()，Symbol.keyFor()
// 有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');
s1 === s2 // true
// Symbol.keyFor方法返回一个已登记的Symbol类型值的key。
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

// 需要注意的是，Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的iframe或service worker中取到同一个值。



// 6 实例：模块的singletion 模式
// mod.js
const FOO_KEY = Symbol.for('foo');
function A() {
  this.foo = 'hello';
}
if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}
module.exports = global[FOO_KEY];



// 7 内置的 Symbol 值
// 除了定义自己使用的Symbol值以外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法。
// 对象的Symbol.hasInstance属性
Symbol.hasInstance
// 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开。
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

// Symbol.species属性
// Symbol.match属性
// Symbol.replace属性
// Symbol.search属性
// Symbol.split属性
// Symbol.iterator属性
// Symbol.toPrimitive属性
// Symbol.toStringTag属性
// Symbol.unscopables属性
