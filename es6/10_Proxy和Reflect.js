// Proxyga概述
// Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
// Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
// 上面代码说明，Proxy实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。

// ES6原生提供Proxy构造函数，用来生成Proxy实例。
var proxy = new Proxy(target, handler);
// 下面是另一个拦截读取属性行为的例子。
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});
proxy.time // 35
proxy.name // 35
proxy.title // 35

// var object = { proxy: new Proxy(target, handler) };
// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"

// 同一个拦截器函数，可以设置拦截多个操作。
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },
  apply: function(target, thisBinding, args) {
    return args[0];
  },
  construct: function(target, args) {
    return {value: args[1]};
  }
};
var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);
fproxy(1, 2) // 1
new fproxy(1,2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo // "Hello, foo"

// 对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。
（1）get(target, propKey, receiver)
拦截对象属性的读取，比如proxy.foo和proxy['foo']。
最后一个参数receiver是一个对象，可选，参见下面Reflect.get的部分。
（2）set(target, propKey, value, receiver)
拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
（3）has(target, propKey)
拦截propKey in proxy的操作，以及对象的hasOwnProperty方法，返回一个布尔值。
（4）deleteProperty(target, propKey)
拦截delete proxy[propKey]的操作，返回一个布尔值。
（5）ownKeys(target)
拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而Object.keys()仅返回对象可遍历的属性。
（6）getOwnPropertyDescriptor(target, propKey)
拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
（7）defineProperty(target, propKey, propDesc)
拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
（8）preventExtensions(target)
拦截bject.preventExtensions(proxy)，返回一个布尔值。
（9）getPrototypeOf(target)
拦截Object.getPrototypeOf(proxy)，返回一个对象。
（10）isExtensible(target)
拦截bject.isExtensible(proxy)，返回一个布尔值。
（11）setPrototypeOf(target, proto)
拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
如果目标对象是函数，那么还有两种额外操作可以拦截。
（12）apply(target, object, args)
拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
（13）construct(target, args)
拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)。


// 2 Proxy实例的方法
get()
set()
apply()     // apply方法拦截函数的调用、call和apply操作。
has()       // has方法用来拦截HasProperty操作
construct() // construct方法用于拦截new命令，下面是拦截对象的写法。
// 栗子
var p = new Proxy(function() {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});
new p(1).value
// "called: 1"
// 10
// construct方法返回的必须是一个对象，否则会报错。
var p = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    return 1;
  }
});
new p() // 报错
// 栗子结束
deleteProperty()
// deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
defineProperty()
// 拦截 Object.defineProperty()
getOwnPropertyDescriptor()
getPrototypeOf()
// 拦截 Object.getPrototypeOf()
isExtensible()
// 拦截 Object.isExtensible()
ownKeys()
// 拦截 Object.keys()
preventExtensions()
// 拦截 Object.preventExtensions()
// 这个方法有一个限制，只有当Object.isExtensible(proxy)为false（即不可扩展）时，proxy.preventExtensions才能返回true，否则会报错。
setPrototypeOf()
// 拦截 Object.setPrototypeOf()



// 3 Proxy.revocable()
// Proxy.revocable方法返回一个可取消的Proxy实例。
let target = {};
let handler = {};
let {proxy, revoke} = Proxy.revocable(target, handler);
proxy.foo = 123;
proxy.foo // 123
revoke();
proxy.foo // TypeError: Revoked
// Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。
// 上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。



// 4 reflect
// Reflect对象的设计目的有这样几个。
// 1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
//     现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。
// 2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，
//     会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}
// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
// 3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，
//     而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
// 老写法
'assign' in Object // true
// 新写法
Reflect.has(Object, 'assign') // true
// 4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
//    这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。
//    也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

// 有了Reflect对象以后，很多操作会更易读。
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1



// 5 reflect 对象的方法
// Reflect对象的方法清单如下，共13个。
      Reflect.apply(target,thisArg,args)
      Reflect.construct(target,args)
      Reflect.get(target,name,receiver)
      Reflect.set(target,name,value,receiver)
      Reflect.defineProperty(target,name,desc)
      Reflect.deleteProperty(target,name)
      Reflect.has(target,name)
      Reflect.ownKeys(target)
      Reflect.isExtensible(target)
      Reflect.preventExtensions(target)
      Reflect.getOwnPropertyDescriptor(target, name)
      Reflect.getPrototypeOf(target)
      Reflect.setPrototypeOf(target, prototype)
// 另外，需要注意的是，Reflect.set()、Reflect.defineProperty()、Reflect.freeze()、Reflect.seal()
// 和Reflect.preventExtensions()返回一个布尔值，表示操作是否成功。它们对应的Object方法，失败时都会抛出错误。
