// ES6诞生以前，异步编程的方法，大概有下面四种。
      // 回调函数
      // 事件监听
      // 发布/订阅
      // Promise 对象



// 1 基本概念
// 异步
// 所谓"异步"，简单说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。

// 回调函数
// JavaScript语言对异步编程的实现，就是回调函数。所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。它的英语名字callback，直译过来就是"重新调用"。
// 读取文件进行处理，是这样写的。
fs.readFile('/etc/passwd', function (err, data) {
  if (err) throw err;
  console.log(data);
});
// 一个有趣的问题是，为什么Node.js约定，回调函数的第一个参数，必须是错误对象err（如果没有错误，该参数就是null）？
// 原因是执行分成两段，在这两段之间抛出的错误，程序无法捕捉，只能当作参数，传入第二段。

// Promise
fs.readFile(fileA, function (err, data) {
  fs.readFile(fileB, function (err, data) {
    // ...
  });
});
var readFile = require('fs-readfile-promise');
readFile(fileA)
.then(function(data){
  console.log(data.toString());
})
.then(function(){
  return readFile(fileB);
})
.then(function(data){
  console.log(data.toString());
})
.catch(function(err) {
  console.log(err);
});
// 可以看到，Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。
// Promise 的最大问题是代码冗余，原来的任务被Promise 包装了一下，不管什么操作，一眼看去都是一堆 then，原来的语义变得很不清楚。



// 2 Generator函数
// 协程 （coroutine）
function *asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
// 上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。
// 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。



// Generator函数的概念
function* gen(x){
  var y = yield x + 2;
  return y;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
// 上面代码中，调用Generator函数，会返回一个内部指针（即遍历器）g 。
// 这是Generator函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。

// Generator函数的数据交换和错误处理
// 都是笔记14中的内容，掠过

// 异步任务的封装
var fetch = require('node-fetch');
function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
// 执行这段代码的方法如下。
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
// 上面代码中，首先执行Generator函数，获取遍历器对象，然后使用next 方法（第二行），执行异步任务的第一阶段。由于Fetch模块返回的是一个Promise对象，因此要用then方法调用下一个next 方法。
// 可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。



// 3 Thunk函数
// 参数的求值策略
// 传值调用和传名调用

// Thunk函数的含义
function f(m){
  return m * 2;
}
f(x + 5);

// 等同于
var thunk = function () {
  return x + 5;
};
function f(thunk){
  return thunk() * 2;
}
// 上面代码中，函数f的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可。
// 这就是Thunk函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式。

// JavaScript语言的Thunk函数
// JavaScript语言是传值调用，它的Thunk函数含义有所不同。在JavaScript语言中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var readFileThunk = Thunk(fileName);
readFileThunk(callback);
var Thunk = function (fileName){
  return function (callback){
    return fs.readFile(fileName, callback);
  };
};
// 任何函数，只要参数有回调函数，就能写成Thunk函数的形式。下面是一个简单的Thunk函数转换器。
// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
var Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
// 使用上面的转换器，生成fs.readFile的Thunk函数。
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
// 下面是另一个完整的例子。
function f(a, cb) {
  cb(a);
}
let ft = Thunk(f);
let log = console.log.bind(console);
ft(1)(log) // 1

// Thunkify模块
// 生产环境的转换器，建议使用Thunkify模块。
// 首先是安装。
$ npm install thunkify
// 使用方式如下。
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
});
// Thunkify的源码与上一节那个简单的转换器非常像。
function thunkify(fn){
  return function(){
    var args = new Array(arguments.length);
    var ctx = this;

    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function(done){
      var called;

      args.push(function(){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
// 它的源码主要多了一个检查机制，变量called确保回调函数只运行一次。这样的设计与下文的Generator函数相关。请看下面的例子。
function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);
}
var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);      // 3
// 上面代码中，由于thunkify只允许回调函数执行一次，所以只输出一行结果。

// Generator 函数的流程管理
// 你可能会问， Thunk函数有什么用？回答是以前确实没什么用，但是ES6有了Generator函数，Thunk函数现在可以用于Generator函数的自动流程管理。
// Generator函数可以自动执行。
function* gen() {
  // ...
}
var g = gen();
var res = g.next();
while(!res.done){
  console.log(res.value);
  res = g.next();
}
// 上面代码中，Generator函数gen会自动执行完所有步骤。
// 但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。这时，Thunk函数就能派上用处。以读取文件为例。
// 下面的Generator函数封装了两个异步操作。
var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFile('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFile('/etc/shells');
  console.log(r2.toString());
};
// 上面代码中，yield命令用于将程序的执行权移出Generator函数，那么就需要一种方法，将执行权再交还给Generator函数。
// 这种方法就是Thunk函数，因为它可以在回调函数里，将执行权交还给Generator函数。
// 为了便于理解，我们先看如何手动执行上面这个Generator函数。
var g = gen();

var r1 = g.next();
r1.value(function(err, data){
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function(err, data){
    if (err) throw err;
    g.next(data);
  });
});

// Thunk函数的自动流程管理
// Thunk函数真正的威力，在于可以自动执行Generator函数。下面就是一个基于Thunk函数的Generator执行器。
function run(fn) {
  var gen = fn();
  function next(err, data) {      // next函数就是Thunk的回调函数
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);          // Thunk 函数, 递归的形式自动执行下去
  }
  next();
}
function* g() {
  // ...
}
run(g);
// yield命令后面的必须是Thunk函数。
var g = function* (){
  var f1 = yield readFile('fileA');
  var f2 = yield readFile('fileB');
  // ...
  var fn = yield readFile('fileN');
};
run(g);



// 4 co模块
// 基本用法
// 比如，有一个Generator函数，用于依次读取两个文件。
var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
// co模块可以让你不用编写Generator函数的执行器。
var co = require('co');
co(gen);
// 上面代码中，Generator函数只要传入co函数，就会自动执行
// co函数返回一个Promise对象，因此可以用then方法添加回调函数。
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});

// co模块的原理
// 两种方法可以做到这一点。
// 1）回调函数。将异步操作包装成Thunk函数，在回调函数里面交回执行权。
// 2）Promise 对象。将异步操作包装成Promise对象，用then方法交回执行权。
// co模块其实就是将两种自动执行器（Thunk函数和Promise对象），包装成一个模块。使用co的前提条件是，Generator函数的yield命令后面，只能是Thunk函数或Promise对象。

// 基于Promise对象的自动执行
// 还是沿用上面的例子。首先，把fs模块的readFile方法包装成一个Promise对象。
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
// 然后，手动执行上面的Generator函数。
var g = gen();
g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data);
  });
});
// 手动执行其实就是用then方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。
function run(gen){
  var g = gen();
  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }
  next();
}
run(gen);
// 上面代码中，只要Generator函数还没执行到最后一步，next函数就调用自身，以此实现自动执行。


// co模块源码
// 首先，co函数接受Generator函数作为参数，返回一个 Promise 对象。
function co(gen) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
  });
}
// 在返回的Promise对象里面，co先检查参数gen是否为Generator函数。如果是，就执行该函数，
// 得到一个内部指针对象；如果不是就返回，并将Promise对象的状态改为resolved。
function co(gen) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
  });
}
// 接着，co将Generator函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
  });
}
// 最后，就是关键的next函数，它会反复调用自身。
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
    + 'but the following object was passed: "' + String(ret.value) + '"'));
}
// 上面代码中，next 函数的内部代码，一共只有四行命令。
// 第一行，检查当前是否为 Generator 函数的最后一步，如果是就返回。
// 第二行，确保每一步的返回值，是 Promise 对象。
// 第三行，使用 then 方法，为返回值加上回调函数，然后通过 onFulfilled 函数再次调用 next 函数。
// 第四行，在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为 rejected，从而终止执行。


// 处理并发的一部操作
// co支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
// 这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面。
// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res);
}).catch(onerror);
// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);

// 下面是另一个例子。
co(function* () {
  var values = [n1, n2, n3];
  yield values.map(somethingAsync);
});
function* somethingAsync(x) {
  // do something async
  return y
}



// 5 async 函数
// 含义
// ES7提供了async函数，使得异步操作变得更加方便。async函数是什么？一句话，async函数就是Generator函数的语法糖。
// 前文有一个Generator函数，依次读取两个文件。
var fs = require('fs');

var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
// 写成async函数，就是下面这样。
var asyncReadFile = async function (){
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// async函数对 Generator 函数的改进，体现在以下四点。
// 1）内置执行器。
// Generator函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
// 2）更好的语义。
// async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
// 3）更广的适用性。
// co模块约定，yield命令后面只能是Thunk函数或Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
// 4）返回值是Promise。
// async函数的返回值是Promise对象，这比Generator函数的返回值是Iterator对象方便多了。你可以用then方法指定下一步的操作。

// 语法
// async函数的语法规则总体上比较简单，难点是错误处理机制。
// 1）async函数返回一个Promise对象。
// async函数内部return语句返回的值，会成为then方法回调函数的参数。
async function f() {
  return 'hello world';
}
f().then(v => console.log(v))     // "hello world"
// async函数内部抛出错误，会导致返回的Promise对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
async function f() {
  throw new Error('出错了');
}
f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了

// 2）async函数返回的Promise对象，必须等到内部所有await命令的Promise对象执行完，才会发生状态改变。
// 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
// 下面是一个例子。
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
// 3）正常情况下，await命令后面是一个Promise对象。如果不是，会被转成一个立即resolve的Promise对象。
async function f() {
  return await 123;
}
f().then(v => console.log(v))
// 123
// 上面代码中，await命令的参数是数值123，它被转成Promise对象，并立即resolve。
// await命令后面的Promise对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
async function f() {
  await Promise.reject('出错了');
}
f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
// 注意，上面代码中，await语句前面没有return，但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。
// 只要一个await语句后面的Promise变为reject，那么整个async函数都会中断执行。
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
// 为了避免这个问题，可以将第一个await放在try...catch结构里面，这样第二个await就会执行。
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// hello world
如果确实希望多个请求并发执行，可以使用Promise.all方法。
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}
// 或者使用下面的写法
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}

// 接着是Generator函数的写法。
function chainAnimationsGenerator(elem, animations) {
  return spawn(function*() {
    var ret = null;
    try {
      for(var anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  });
}

// 最后是Async函数的写法。
async function chainAnimationsAsync(elem, animations) {
  var ret = null;
  try {
    for(var anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}
