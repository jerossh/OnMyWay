// 1 属性的简洁表示法
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}
// 等同于
var baz = {foo: foo};
// ES6允许在对象之中，只写属性名，不写属性值。这时，属性值等于属性名所代表的变量
function f(x, y) {
  return {x, y};
}
// 等同于
function f(x, y) {
  return {x: x, y: y};
}
f(1, 2) // Object {x: 1, y: 2}
// 方法也能简写
var o = {
  method() {
    return "Hello!";
  }
};
// 等同于
var o = {
  method: function() {
    return "Hello!";
  }
};
// 实际var birth = '2000/01/01';

var Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};
// 这种写法用于函数的返回值，将会非常方便。
function getPoint() {
  var x = 1;
  var y = 10;
  return {x, y};
}
getPoint()    // {x:1, y:10}
// CommonJS模块输出变量，就非常合适使用简洁写法。
var ms = {};
function getItem (key) {
  return key in ms ? ms[key] : null;
}
function setItem (key, value) {
  ms[key] = value;
}
function clear () {
  ms = {};
}
module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};
// 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
var cart = {
  _wheels: 4,
  get wheels () {
    return this._wheels;
  },
  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}
// 注意，简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。
var obj = {
  class () {}
};
// 等同于
var obj = {
  'class': function() {}
};



// 2 属性名表达式
// ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
var lastWord = 'last word';
// 下面是另一个例子。
var lastWord = 'last word';
var a = {
  'first word': 'hello',
  [lastWord]: 'world'
};
a['last word'] // "world"
// 表达式还可以用于定义方法名。
let obj = {
  ['h'+'ello']() {
    return 'hi';
  }
};
obj.hello() // hi
// 注意，属性名表达式与简洁表示法，不能同时使用，会报错。
// 报错
var foo = 'bar';
var bar = 'abc';
var baz = { [foo] };
// 正确
var foo = 'bar';
var baz = { [foo]: 'abc'};



// 3 方法 name 的属性
// 上面代码中，方法的name属性返回函数名（即方法名）。如果使用了取值函数，则会在方法名前加上get。如果是存值函数，方法名的前面会加上set。
// 有两种特殊情况：bind方法创造的函数，name属性返回“bound”加上原函数的名字；Function构造函数创造的函数，name属性返回“anonymous”。
// 如果对象的方法是一个Symbol值，那么name属性返回的是这个Symbol值的描述。
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""



// 4 Object.is()  同值相等
Object.is('foo', 'foo') // true
Object.is({}, {})       // false
+0 === -0               // true
NaN === NaN             // false
Object.is(+0, -0)       // false
Object.is(NaN, NaN)     // true


// 5 Object.assign()
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
// 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
// 如果只有一个参数，Object.assign会直接返回该参数。
var obj = {a: 1};
Object.assign(obj) === obj // true
// 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错
Object.assign(undefined) // 报错
Object.assign(null) // 报错
// 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。
// 这意味着，如果undefined和null不在首参数，就不会报错。
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
// 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
// 只有字符串的包装对象，会产生可枚举属性。
Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}


// Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)     // { b: 'c' }
// 属性名为Symbol值的属性，也会被Object.assign拷贝。
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })   // { a: 'b', Symbol(c): 'd' }


// 注意点
// Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
var obj1 = {a: {b: 1}};
var obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
obj2.a.b // 2
// 对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
var target = { a: { b: 'c', d: 'e' } }
var source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }

// 注意，Object.assign可以用来处理数组，但是会把数组视为对象。
Object.assign([1, 2, 3], [4, 5])  // [4, 5, 3]



// 常见用途
// 1）为对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
// 2）为对象添加方法
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});
// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};

// 3）克隆对象
function clone(origin) {
  return Object.assign({}, origin);
}
// 不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
// 4）合并多个对象
const merge = (target, ...sources) => Object.assign(target, ...sources);
const merge = (...sources) => Object.assign({}, ...sources)   // 返回新对象
// 5）为属性指定默认值
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};
function processContent(options) {
  let options = Object.assign({}, DEFAULTS, options);
}



// 6 属性的可枚举性
// Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
// ES5有三个操作会忽略enumerable为false的属性。
for...in                    // 循环：只遍历对象自身的和继承的可枚举的属性
Object.keys()               // 返回对象自身的所有可枚举的属性的键名
JSON.stringify()            // 只串行化对象自身的可枚举的属性
// ES6新增了一个操作 Object.assign()，会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
// 这四个操作之中，只有for...in会返回继承的属性。实际上，引入enumerable的最初目的，就是让某些属性可以规避掉for...in操作。
// 比如，对象原型的toString方法，以及数组的length属性，就通过这种手段，不会被for...in遍历到。
// 另外，ES6规定，所有Class的原型的方法都是不可枚举的。



// 7 属性的遍历
// ES6一共有5种方法可以遍历对象的属性。
// （1）for...in
// for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
// （2）Object.keys(obj)
// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
// （3）Object.getOwnPropertyNames(obj)
// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
// （4）Object.getOwnPropertySymbols(obj)
// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。
// （5）Reflect.ownKeys(obj)
// Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。

// 以上的5种方法遍历对象的属性，都遵守同样的属性遍历的次序规则。
// 首先遍历所有属性名为数值的属性，按照数字排序。
// 其次遍历所有属性名为字符串的属性，按照生成时间排序。
// 最后遍历所有属性名为Symbol值的属性，按照生成时间排序。


// 8 __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()



// 9 Object.values()，Object.entries()



// 10 对象的扩展运算符   ES7
// 1）Rest解构赋值
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4
