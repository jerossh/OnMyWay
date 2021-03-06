// 1 简介
// Generator函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。
// Generator函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。
// 执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。
// 形式上，Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield语句，定义不同的内部状态
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
hw.next()     // { value: 'hello', done: false }
hw.next()     // { value: 'world', done: false }
hw.next()     // { value: 'ending', done: true }
hw.next()     // { value: undefined, done: true }
// 第四次调用，此时Generator函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

// yield语句
// 遍历器对象的next方法的运行逻辑如下。
// 1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
// 2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。
// 3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
// 4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

// 需要注意的是，yield语句后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为JavaScript提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
function* gen() {
  yield  123 + 456;
}
gen().next()  // 有next 才会求


// 与Iterator接口的关系
// 上一章说过，任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。
// 由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使得该对象具有Iterator接口。
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]
// Generator函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
function* gen(){
  // some code
}
var g = gen();
g[Symbol.iterator]() === g
// true


function* gen(){
  // some code
}
var g = gen();
g[Symbol.iterator]()




// 2 next方法的参数
// yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值



// 3 for...of循环
function* f() {
  for(var i=0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}
var g = f();
g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
// 再看一个例子。
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}
var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
// 上面代码中，第二次运行next方法的时候不带参数，导致y的值等于2 * undefined（即NaN），除以3以后还是NaN，
// 因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。
// 如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；
// 第二次调用next方法，将上一次yield语句的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield语句的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。

// 注意，由于next方法的参数表示上一个yield语句的返回值，所以第一次使用next方法时，不能带有参数。V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。
// 从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。
// 如果想要第一次调用next方法时，就能够输入值，可以在Generator函数外面再包一层。
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}
const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});
wrapped().next('hello!')        // First input: hello!

// 再看一个通过next方法的参数，向Generator函数内部输入值的例子。

// 3 for...of循环
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5

// 下面是一个利用Generator函数和for...of循环，实现斐波那契数列的例子。
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}
for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

// 由于for...of循环会自动依次执行yield命令，这启发我们可以将一些按步骤操作的任务，写在Generator函数里面。
let steps = [step1Func, step2Func, step3Func];
function *iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}

// 将任务分解成步骤之后，还可以将项目分解成多个依次执行的任务。（看起来很强大，有点看不懂）
let jobs = [job1, job2, job3];
function *iterateJobs(jobs){
  for (var i=0; i< jobs.length; i++){
    var job = jobs[i];
    yield *iterateSteps(job.steps);
  }
}
// 最后，就可以用for...of循环一次性依次执行所有任务的所有步骤。
for (var step of iterateJobs(jobs)){
  console.log(step.id);
}
// 注意，上面的做法只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤。

// for...of循环，通过Generator函数为它加上这个接口，就可以用了。
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj
  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }

let jane = { first: 'Jane', last: 'Doe'
for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]
// Array.form 方法
Array.from(numbers()) // [1, 2]
// 解构赋值
let [x, y] = numbers();
x // 1
y // 2
// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2



// 4 Generator.prototype.throw()
// Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
// 上面代码中，遍历器对象i连续抛出两个错误。第一个错误被Generator函数体内的catch语句捕获。
// i第二次抛出错误，由于Generator函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了Generator函数体，被函数体外的catch语句捕获。

// throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例。
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log(e);
  }
};

var i = g();
i.next();
i.throw(new Error('出错了！'));
// Error: 出错了！(…)
// 和外部 throw 不要混淆
var g = function* () {
  while (true) {
    try {
      yield;
    } catch (e) {
      if (e != 'a') throw e;
      console.log('内部捕获', e);
    }
  }
};
var i = g();
i.next();
try {
  throw new Error('a');
  throw new Error('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 [Error: a]

// 如果Generator函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
var g = function* () {
  while (true) {
    yield;
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a
// 如果Generator函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。

// throw方法被捕获以后，会附带执行下一条yield语句。也就是说，会附带执行一次next方法。
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}
var g = gen();
g.next() // a
g.throw() // b
g.next() // c
// 这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield语句，可以只用一个try...catch代码块来捕获错误
// 如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在Generator函数内部写一次catch语句就可以了。
// 一旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即JavaScript引擎认为这个Generator已经运行结束了。



// 5 Generator.prototype.return()
// Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。
// 如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。



// 6 yield*语句
// 如果在Generater函数内部，调用另一个Generator函数，默认情况下是没有效果的。
function* foo() {
  yield 'a';
  yield 'b';
}
function* bar() {
  yield 'x';
  foo();
  yield 'y';
}
for (let v of bar()){
  console.log(v);
}
// "x"
// "y"

// 这个就需要用到yield*语句，用来在一个Generator函数里面执行另一个Generator函数。
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}
// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}
for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"

// 再来看一个对比的例子。
function* inner() {
  yield 'hello!';
}
function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}
var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"
function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}
var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"

// 从语法角度看，如果yield命令后面跟的是一个遍历器对象，需要在yield命令后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*语句。
function* concat(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}
// 等同于
function* concat(iter1, iter2) {
  for (var value of iter1) {
    yield value;
  }
  for (var value of iter2) {
    yield value;
  }
}
// 如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
function* gen(){
  yield* ["a", "b", "c"];
}
gen().next() // { value:"a", done:false }
// 实际上，任何数据结构只要有Iterator接口，就可以被yield*遍
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();
read.next().value // "hello"
read.next().value // "h"
// 如果被代理的Generator函数有return语句，那么就可以向代理它的Generator函数返回数据。
function *foo() {
  yield 2;
  yield 3;
  return "foo";
}
function *bar() {
  yield 1;
  var v = yield *foo();
  console.log( "v: " + v );
  yield 4;
}
var it = bar();
it.next()       // {value: 1, done: false}
it.next()       // {value: 2, done: false}
it.next()       // {value: 3, done: false}
it.next();      // "v: foo"    // {value: 4, done: false}
it.next()       // {value: undefined, done: true}
// 上面代码在第四次调用next方法的时候，屏幕上会有输出，这是因为函数foo的return语句，向函数bar提供了返回值。
// 再看一个例子。
function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}
[...logReturned(genFuncWithReturn())]
// The result
// 值为 [ 'a', 'b' ]

// yield*命令可以很方便地取出嵌套数组的所有成员。
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e

// 下面是一个稍微复杂的例子，使用yield*语句遍历完全二叉树。
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}
// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
// new Tree([['a'], 'b', ['c']], d, [['e'], 'f', ['g']])
// tree.left = make([['a'], 'b', ['c']]);
// tree.label = d;
// tree.right = make([['e'], 'f', ['g']]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}
result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']



// 7 作为对象属性的Generator函数
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
// 等价于
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};



// 8 Generator函数的this
// Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法。
// 但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。
function* g() {
  this.a = 11;
}
let obj = g();
obj.a // undefined
// Generator函数也不能跟new命令一起用，会报错。
function* F() {
  yield this.x = 2;
  yield this.y = 3;
}
new F()// TypeError: F is not a constructor
// 上面代码中，new命令跟构造函数F一起使用，结果报错，因为F不是构造函数

// 下面是一个变通方法。首先，生成一个空对象，使用bind方法绑定Generator函数内部的this。
// 这样，构造函数调用以后，这个空对象就是Generator函数的实例对象了。
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
obj.a // 1
obj.b // 2
obj.c // 3

// 一个办法就是将obj换成F.prototype。
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
f.a // 1
f.b // 2
f.c // 3


// 9 含义
// Generator与状态机
// Generator是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}
// 上面代码的clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。这个函数如果用Generator实现，就是下面这样。
var clock = function*() {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};


// Generator 与 协程
// 1）协程与子例程的差异
// 从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，
// 也就是说，协程是以多占用内存为代价，实现多任务的并行。
// 2）协程与普通线程的差异
// 不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。
// 此外，普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。



// 10 应用
// 1）异步操作的同步化表达
// Generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()
// 卸载UI
loader.next()
// 上面代码表示，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。
// 下一次对该遍历器调用next方法，则会显示Loading界面，并且异步加载数据。
// 等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。
// 可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。

// Ajax是典型的异步操作，通过Generator函数部署Ajax操作，可以用同步的方式表达。
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}
function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);       // result == response
  });
}
var it = main();
it.next();

// 下面是另一个例子，通过Generator函数逐行读取文本文件。
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}

// 2）控制流管理
// 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
// 采用Promise改写上面的代码。
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();
// 上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量Promise的语法。Generator函数可以进一步改善代码运行流程。
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
// 然后，使用一个函数，按次序自动执行所有步骤。
scheduler(longRunningTask(initialValue));
function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
// 注意，上面这种做法，只适合同步操作，即所有的task都必须是同步的，不能有异步操作。

// 下面，利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。
let steps = [step1Func, step2Func, step3Func];
function *iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}

// 3)部署iterator接口
// 利用Generator函数，可以在任意对象上部署iterator接口。
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}
let myObj = { foo: 3, bar: 7 };
for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}
// foo 3
// bar 7

// 下面是一个对数组部署Iterator接口的例子，尽管数组原生具有这个接口。
function* makeSimpleGenerator(array){
  var nextIndex = 0;
  while(nextIndex < array.length){
    yield array[nextIndex++];
  }
}
var gen = makeSimpleGenerator(['yo', 'ya']);
gen.next().value // 'yo'
gen.next().value // 'ya'
gen.next().done  // true

// 4)作为数据结构
function *doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
// 上面代码就是依次返回三个函数，但是由于使用了Generator函数，导致可以像处理数组那样，处理这三个返回的函数。
for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
// 实际上，如果用ES5表达，完全可以用数组模拟Generator的这种用法。
function doStuff() {
  return [
    fs.readFile.bind(null, 'hello.txt'),
    fs.readFile.bind(null, 'world.txt'),
    fs.readFile.bind(null, 'and-such.txt')
  ];
}
