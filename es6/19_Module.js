// 历史上，JavaScript一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。
// 其他语言都有这项功能，比如Ruby的require、Python的import，甚至就连CSS都有@import，但是JavaScript任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。
// 在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种。

// 在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。
// ES6在语言规格的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

// ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
// CommonJS和AMD模块，都只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性。
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;
// 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取3个方法。
// 这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

// ES6模块不是对象，而是通过export命令显式指定输出的代码，输入时也采用静态命令的形式。
// ES6模块
import { stat, exists, readFile } from 'fs';
// 上面代码的实质是从fs模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”，即ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高。
// 当然，这也导致了没法引用ES6模块本身，因为它不是对象。

// 由于ES6模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽JavaScript的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

// 除了静态加载带来的各种好处，ES6模块还有以下好处。
// 不再需要UMD模块格式了，将来服务器和浏览器都会支持ES6模块格式。目前，通过各种工具库，其实已经做到了这一点。
// 将来浏览器的新API就能用模块格式提供，不再必要做成全局变量或者navigator对象的属性。
// 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。
<script type="module" src="foo.js"></script>
// Node的默认模块格式是CommonJS，目前还没决定怎么支持ES6模块。所以，只能通过Babel这样的转码器，在Node里面使用ES6模块。

// 1 严格模式
// ES6的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

// 严格模式主要有以下限制。
    变量必须声明后再使用
    函数的参数不能有同名属性，否则报错
    不能使用with语句
    不能对只读属性赋值，否则报错
    不能使用前缀0表示八进制数，否则报错
    不能删除不可删除的属性，否则报错
    不能删除变量delete prop，会报错，只能删除属性delete global[prop]
    eval不会在它的外层作用域引入变量
    eval和arguments不能被重新赋值
    arguments不会自动反映函数参数的变化
    不能使用arguments.callee
    不能使用arguments.caller
    禁止this指向全局对象
    不能使用fn.caller和fn.arguments获取函数调用的堆栈
    增加了保留字（比如protected、static和interface）



// 2 export命令
// 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
// 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
// 下面是一个JS文件，里面使用export命令输出变量
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// export的写法，除了像上面这样，还有另外一种。
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export {firstName, lastName, year};
// 上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。
// export命令除了输出变量，还可以输出函数或类（class）。
export function multiply(x, y) {
  return x * y;
};
// 上面代码对外输出一个函数multiply。
// 通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。
function v1() { ... }
function v2() { ... }
export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
// 上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。
// 报错
export 1;
// 报错
var m = 1;
export m;
// 上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量m，还是直接输出1。1只是一个值，不是接口。正确的写法是下面这样。
// 写法一
export var m = 1;
// 写法二
var m = 1;
export {m};
// 写法三
var n = 1;
export {n as m};
// 上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

// 同样的，function和class的输出，也必须遵守这样的写法。
// 报错
function f() {}
export f;
// 正确
export function f() {};
// 正确
function f() {}
export {f};

// 另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// 上面代码输出变量foo，值为bar，500毫秒之后变成baz。
// 这一点与CommonJS规范完全不同。CommonJS模块输出的是值的缓存，不存在动态更新，详见下文《ES6模块加载的实质》一节。

// 最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。
// 这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷。
function foo() {
  export default 'bar' // SyntaxError
}
foo()
// 上面代码中，export语句放在函数之中，结果报错。



// 3 import命令
// 使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）。
// main.js
import {firstName, lastName, year} from './profile';
function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
import { lastName as surname } from './profile';

// 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。
foo();
import { foo } from 'my_module';
// 上面的代码不会报错，因为import的执行早于foo的调用。

// 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;

// 另外，ES7有一个提案，简化先输入后输出的写法，拿掉输出时的大括号。
// 提案的写法
export v from 'mod';
// 现行的写法
export {v} from 'mo';
// import语句会执行所加载的模块，因此可以有下面的写法。
import 'lodash';



// 4 模块的整体加载
// 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
// 下面是一个circle.js文件，它输出两个方法area和circumference。
// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}
export function circumference(radius) {
  return 2 * Math.PI * radius;
}
// 现在，加载这个模块。
// main.js
import { area, circumference } from './circle';
console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
// 上面写法是逐一指定要加载的方法，整体加载的写法如下。
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));



// 5 export default命令
// 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。
// export-default.js
export default function () {
  console.log('foo');
}
// 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
// import-default.js
import customName from './export-default';
customName(); // 'foo'

// export default命令用在非匿名函数前，也是可以的。
// export-default.js
export default function foo() {
  console.log('foo');
}
// 或者写成
function foo() {
  console.log('foo');
}
export default foo;
// 上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。
// 下面比较一下默认输出和正常输出
// 输出
export default function crc32() {
  // ...
}
// 输入
import crc32 from 'crc32';

// 输出
export function crc32() {
  // ...
};
// 输入
import {crc32} from 'crc32';
// 上面代码的两组写法，第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。

// 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as xxx } from 'modules';
// 等同于
// import xxx from 'modules';

// 正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
// 正确
export var a = 1;
// 正确
var a = 1;
export default a;
// 错误
export default var a = 1;

// 有了export default命令，输入模块时就非常直观了，以输入jQuery模块为例。
import $ from 'jquery';
// 如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样。
import customName, { otherMethod } from './export-default';
// 如果要输出默认的值，只需将值跟在export default之后即可。
export default 42

// export default也可以用来输出类。
// MyClass.js
export default class { ... }
// main.js
import MyClass from 'MyClass';
let o = new MyClass();



// 6 模块的继承
// 模块之间也可以继承。
// 假设有一个circleplus模块，继承了circle模块。
// circleplus.js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
// 上面代码中的export *，表示再输出circle模块的所有属性和方法。注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。
// 这时，也可以将circle的属性或方法，改名后再输出。
// circleplus.js
export { area as circleArea } from 'circle';
// 上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。
// 加载上面模块的写法如下。
// main.js
import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));



// 7 ES6模块加载的实质
// ES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
// 上面代码说明，lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。这是因为mod.counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};

// ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，
// 换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}
// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
// 由于ES6输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}
export let c = new C();
// 上面的脚本mod.js，输出的是一个C的实例。不同的脚本加载这个模块，得到的都是同一个实例。
// x.js
import {c} from './mod';
c.add();
// y.js
import {c} from './mod';
c.show();
// main.js
import './x';
import './y';
// 现在执行main.js，输出的是1。
$ babel-node main.js
// 1



// 8 循环加载
// “循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚
// a.js
var b = require('b');
// b.js
var a = require('a');

// CommonJS模块的加载原理
// 上面代码就是Node内部加载模块后生成的一个对象。该对象的id属性是模块名，exports属性是模块输出的各个接口，
// loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。
//
// 以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值
// 。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

// CommonJS模块的循环加载
// 让我们来看，Node官方文档里面的例子。脚本文件a.js代码如下。
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
// 再看b.js的代码。
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');

// a.js已经执行的部分，只有一行。
// exports.done = false;
// 因此，对于b.js来说，它从a.js只输入一个变量done，值为false。
// 然后，b.js接着往下执行，等到全部执行完毕，再把执行权交还给a.js。于是，a.js接着往下执行，直到执行完毕。我们写一个脚本main.js，验证这个过程。
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
// 执行main.js，运行结果如下。
$ node main.js

在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
// 另外，由于CommonJS模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
// 上面代码中，如果发生循环加载，require('a').foo的值很可能后面会被改写，改用require('a')会更保险一点。



// ES6模块的循环加载
// ES6处理“循环加载”与CommonJS有本质的不同。ES6模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），
// 那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。
// 请看下面这个例子。
// a.js如下
import {bar} from './b.js';
console.log('a.js');
console.log(bar);
export let foo = 'foo';

// b.js
import {foo} from './a.js';
console.log('b.js');
console.log(foo);
export let bar = 'bar';
// 上面代码中，a.js加载b.js，b.js又加载a.js，构成循环加载。执行a.js，结果如下。$ babel-node a.js
$ babel-node a.js
b.js
undefined
a.js
bar

// 再看一个稍微复杂的例子（摘自 Dr. Axel Rauschmayer 的《Exploring ES6》）。
// a.js
import {bar} from './b.js';
export function foo() {
  console.log('foo');
  bar();
  console.log('执行完毕');
}
foo();

// b.js
import {foo} from './a.js';
export function bar() {
  console.log('bar');
  if (Math.random() > 0.5) {
    foo();
  }
}
// 按照CommonJS规范，上面的代码是没法执行的。a先加载b，然后b又加载a，这时a还没有任何执行结果，所以输出结果为null，即对于b.js来说，变量foo的值等于null，后面的foo()就会报错。
// 但是，ES6可以执行上面的代码。
$ babel-node a.js
foo
bar
执行完毕

// 执行结果也有可能是
foo
bar
foo
bar
执行完毕
执行完毕

// 下面，我们详细分析这段代码的运行过程。
// a.js

// 这一行建立一个引用，
// 从`b.js`引用`bar`
import {bar} from './b.js';

export function foo() {
  // 执行时第一行输出 foo
  console.log('foo');
  // 到 b.js 执行 bar
  bar();
  console.log('执行完毕');
}
foo();

// b.js

// 建立`a.js`的`foo`引用
import {foo} from './a.js';

export function bar() {
  // 执行时，第二行输出 bar
  console.log('bar');
  // 递归执行 foo，一旦随机数
  // 小于等于0.5，就停止执行
  if (Math.random() > 0.5) {
    foo();
  }
}

// 我们再来看ES6模块加载器SystemJS给出的一个例子。
// even.js
import { odd } from './odd'
export var counter = 0;
export function even(n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
import { even } from './even';
export function odd(n) {
  return n != 0 && even(n - 1);
}
// 运行上面这段代码，结果如下。
$ babel-node
> import * as m from './even.js';
> m.even(10);
true
> m.counter
6
> m.even(20)
true
> m.counter
17
// 上面代码中，参数n从10变为0的过程中，even()一共会执行6次，所以变量counter等于6。第二次调用even()时，参数n从20变为0，even()一共会执行11次，加上前面的6次，所以变量counter等于17。
// 这个例子要是改写成CommonJS，就根本无法执行，会报错。
// even.js
var odd = require('./odd');
var counter = 0;
exports.counter = counter;
exports.even = function(n) {
  counter++;
  return n == 0 || odd(n - 1);
}

// odd.js
var even = require('./even').even;
module.exports = function(n) {
  return n != 0 && even(n - 1);
}
// 上面代码中，even.js加载odd.js，而odd.js又去加载even.js，形成“循环加载”。
// 这时，执行引擎就会输出even.js已经执行的部分（不存在任何结果），所以在odd.js之中，变量even等于null，等到后面调用even(n-1)就会报错。
$ node
> var m = require('./even');
> m.even(10)
// TypeError: even is not a function



// 9 跨模块常量
// 上面说过，const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），可以采用下面的写法
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3



// 10 ES6模块的转码
// 浏览器目前还不支持ES6模块，为了现在就能使用，可以将转为ES5的写法。除了Babel可以用来转码之外，还有以下两个方法，也可以用来转码。

// ES6 module transpiler
// ES6 module transpiler是square公司开源的一个转码器，可以将ES6模块转为CommonJS模块或AMD模块的写法，从而在浏览器中使用。

// SystemJS
// 另一种解决方法是使用SystemJS。它是一个垫片库（polyfill），可以在浏览器内加载ES6模块、AMD模块和CommonJS模块，将其转为ES5格式。它在后台调用的是Google的Traceur转码器。
