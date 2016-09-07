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
class Point {
  constructor(){
    // ...
  }
  toString(){
    // ...
  }
  toValue(){
    // ...
  }
}
// 等同于
Point.prototype = {
  toString(){},
  toValue(){}
};
// 在类的实例上面调用方法，其实就是调用原型上的方法。
class B {}
let b = new B();
b.constructor === B.prototype.constructor // true
// 上面代码中，b是B类的实例，它的constructor方法就是B类原型的constructor方法。
class Point {
  constructor(){
    // ...
  }
}
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
// prototype对象的constructor属性，直接指向“类”的本身，这与ES5的行为是一致的。
Point.prototype.constructor === Point // true
// 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
class Point {
  constructor(x, y) {
    // ...
  }
  toString() {
    // ...
  }
}
Object.keys(Point.prototype)      // []
Object.getOwnPropertyNames(Point.prototype)     // ["constructor","toString"]
// 上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。这一点与ES5的行为不一致。

// constructor方法
// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
constructor() {}
// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
// 上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。
// 类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
class Foo {
  constructor() {
    return Object.create(null);
  }
}
Foo()     // TypeError: Class constructor Foo cannot be invoked without 'new'

// 类的实例对象
// 生成类的实例对象的写法，与ES5完全一样，也是使用new命令。如果忘记加上new，像函数那样调用Class，将会报错。
// 与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}
var point = new Point(2, 3);
point.toString() // (2, 3)
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
// 上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。
// 与ES5一样，类的所有实例共享一个原型对象。
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__     //true
// 这也意味着，可以通过实例的__proto__属性为Class添加方法
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__.printName = function () { return 'Oops' };
p1.printName() // "Oops"
p2.printName() // "Oops"
var p3 = new Point(4,2);
p3.printName() // "Oops"
// 不推荐使用，因为这会改变Class的原始定义，影响到所有实例。

// 不存在变量提升
new Foo(); // ReferenceError
class Foo {}
// Class表达式
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
// 上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类。
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
// 采用Class表达式，可以写出立即执行的Class。
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName(); // "张三"


// 私有方法
// 私有方法是常见需求，但ES6不提供，只能通过变通方法模拟实现。
// 一种做法是在命名上加以区别。
class Widget {
  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }
  // ...
}
// 还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
  // ...
};

// this的指向
// 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }
  print(text) {
    console.log(text);
  }
}
const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
// 上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。
// 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }
  // ...
}
// 另一种解决方法是使用箭头函数。
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}
const logger = selfish(new Logger());

// 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。
// 考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

// name属性
class Point {}
Point.name // "Point"



// 2 Class的继承
// 基本用法
// Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。
class ColorPoint extends Point {}
// 上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。下面，我们在ColorPoint内部加上代码。
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
class Point { /* ... */ }
class ColorPoint extends Point {
  constructor() {
  }
}
let cp = new ColorPoint(); // ReferenceError
// ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
constructor(...args) {
  super(...args);
}
// 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}

// 下面是生成子类实例的代码。
let cp = new ColorPoint(25, 8, 'green');
cp instanceof ColorPoint // true
cp instanceof Point // true

// 类的prototype属性和__proto__属性
// 大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
// 1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
// 2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
class A {
}
class B extends A {
}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true


// Extends 的继承目标
// 第一种特殊情况，子类继承Object类。
class A extends Object {
}
A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
// 第二种特殊情况，不存在任何继承。
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
// 第三种特殊情况，子类继承null。
class A extends null {
}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true

// Object.getPrototypeOf()
// Object.getPrototypeOf方法可以用来从子类上获取父类。
Object.getPrototypeOf(ColorPoint) === Point   // true


// super关键字
// super这个关键字，有两种用法，含义不同。
// 1）作为函数调用时（即super(...args)），super代表父类的构造函数。
// 2）作为对象调用时（即super.prop或super.method()），super代表父类。注意，此时super即可以引用父类实例的属性和方法，也可以引用父类的静态方法。


// 实例的__proto__属性
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');
p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
// 因此，通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为。
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};
p1.printName() // "Ha"


// 原生构造函数的继承
// 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有下面这些。


// 以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  // 这段代码影响后面显示
  // constructor: {
  //   value: MyArray,
  //   writable: true,
  //   configurable: true,
  //   enumerable: true
  // }
});
// 上面代码定义了一个继承Array的MyArray类。但是，这个类的行为与Array完全不一致。
var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
// 之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过Array.apply()或者分配给原型对象都不行。
// 原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定，导致拿不到内部属性。
// ES5是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数
// 。比如，Array构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常。

var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
// 下面的例子中，我们想让一个普通对象继承Error对象。
var e = {};
Object.getOwnPropertyNames(Error.call(e))     // [ 'stack' ]
Object.getOwnPropertyNames(e)     // []

// ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。下面是一个继承Array的例子。
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}
var arr = new MyArray();
arr[0] = 12;
arr.length // 1
arr.length = 0;
arr[0] // undefined
// 上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。

// 上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。
class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();
x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]
x.commit();
x.history // [[], [1, 2]]
x.push(3);
x // [1, 2, 3]
x.revert();
x // [1, 2]
// 上面代码中，VersionedArray结构会通过commit方法，将自己的当前状态存入history属性，然后通过revert方法，可以撤销当前版本，回到上一个版本。
// 除此之外，VersionedArray依然是一个数组，所有原生的数组方法都可以在它上面调用。

// 下面是一个自定义Error子类的例子。
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}
class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}
var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...
// 注意，继承Object的子类，有一个行为差异。
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
console.log(o.attr === true);  // false



// 4 Class的取值函数（getter）和存值函数（setter）
// 与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}
let inst = new MyClass();
inst.prop = 123;      // setter: 123
inst.prop     // 'getter'

// 存值函数和取值函数是设置在属性的descriptor对象上的。
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }
  get html() {
    return this.element.innerHTML;
  }
  set html(value) {
    this.element.innerHTML = value;
  }
}
var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html");
"get" in descriptor  // true
"set" in descriptor  // true




// 5 Class的Generator方法
// 如果某个方法之前加上星号（*），就表示该方法是一个Generator函数。
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
// 上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器



// 6 Class的静态方法
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()     // TypeError: foo.classMethod is not a function

// 父类的静态方法，可以被子类继承。
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
}
Bar.classMethod(); // 'hello'

// 静态方法也是可以从super对象上调用的。
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}
Bar.classMethod();



// 7 Class的静态属性和实例属性
// 静态属性指的是Class本身的属性，即Class.propname，而不是定义在实例对象（this）上的属性。
class Foo {
}
Foo.prop = 1;
Foo.prop // 1
// 目前，只有这种写法可行，因为ES6明确规定，Class内部只有静态方法，没有静态属性。
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}
Foo.prop // undefined

// ES7有一个静态属性的提案，目前Babel转码器支持。
// 这个提案对实例属性和静态属性，都规定了新的写法。
// 1）类的实例属性
class MyClass {
  myProp = 42;
  constructor() {
    console.log(this.myProp); // 42
  }
}
// 以前，我们定义实例属性，只能写在类的constructor方法里面。
class ReactCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}
// 上面代码中，构造方法constructor里面，定义了this.state属性。
// 有了新的写法以后，可以不在constructor方法里面定义。
class ReactCounter extends React.Component {
  state = {
    count: 0
  };
}
// 这种写法比以前更清晰。
// 为了可读性的目的，对于那些在constructor里面已经定义的实例属性，新写法允许直接列出。
class ReactCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  state;
}
// 2）类的静态属性
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myProp); // 42
  }
}
// 同样的，这个新写法大大方便了静态属性的表达。
// 老写法
class Foo {
}
Foo.prop = 1;
// 新写法
class Foo {
  static prop = 1;
}

// 8 new.target属性
// new是从构造函数生成实例的命令
// ES6为new命令引入了一个new.target属性，（在构造函数中）返回new命令作用于的那个构造函数。
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}
// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}
var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
// 上面代码确保构造函数只能通过new命令调用。
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}
var obj = new Rectangle(3, 4); // 输出 true
// 需要注意的是，子类继承父类时，new.target会返回子类。
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}
// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}
var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错

// Class内部调用new.target，返回当前Class。
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}
var obj = new Rectangle(3, 4); // 输出 true
// 需要注意的是，子类继承父类时，new.target会返回子类。
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}
var obj = new Square(3); // 输出 false
// 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}
class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}
var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
// 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}
class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}
var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确



// 9 Mixin模式的实现
// Mixin模式指的是，将多个类的接口“混入”（mix in）另一个类。它在ES6的实现如下。
function mix(...mixins) {
  class Mix {}
  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
// 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
