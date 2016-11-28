// 数据分组
// 错误版本
var stime = Date.now();
function chunk(array, process, context) {        // 记得作用域
  var item = array.shift();             // 第一次要不要定时没关系的吧， 有关系，shift出错，都不知道的为什么
  console.log('i ' + item);
  process.call(context, item)

  if (array.length > 0) {
    setTimeout(arguments.callee(array, process, context), 100)   // 不起作用，还要setTimeout干嘛
  }
}
function printInfo(item) {
  var etime = Date.now();
  console.log(etime - stime);
}
var arr1 = [1,3,4,33,4]
chunk(arr1, printInfo)
// 纠正版本,还是错
function chunk(arr, process, context) {
  setTimeout(function() {
    var item = arr.shift();
    process.call(context, item);
    if (arr.length > 0) {
      arguments.callee        //这样也不行
    }
  }, 100)
}
function printInfo(item) {
  console.log(item);
}
var arr1 = [1,3,4,33,4]
chunk(arr1, printInfo)

// 纠正版本
function chunk(arr, process, context) {
  setTimeout(function() {
    var item = arr.shift();
    process.call(context, item);
    if (arr.length > 0) {
      setTimeout(arguments.callee, 100)
    }
  }, 100)
}
function printInfo(item) {
  console.log(item);
}
var arr1 = [1,3,4,33,4]
chunk(arr1, printInfo)


// 函数节流
var processor = {
  timeoutId: null,
  process: function() {
    console.log('do something');
  }
  throttle: function() {
    clearTimeout(this.timeoutId);      //忘了this了，有作用到其他的项目的
    var that = this;
    timeoutId = setTimeout(function() {
      that.process();
    })
  }
}
// 简化版本
function throttle(method, context) {
  clearTimeout(method.tid);
  method.tid = setTimeout(function() {
    method.call(context);
  }, 100);
}
function resizeDiv() {
  var div = document.getElementsByClassName('className');
  div.style.height = parseInt(div.offsetWidth) + 'px';
}
window.onresize = function() {
  throttle(resizeDiv)
}

// 找出所有的位置
var str = 'fdgsddfsdfdfgsdfahtd';
var positions = [];
var pos = str.indexOf('d');
while(pos > -1) {
  positions.push(pos);
  pos = str.indexOf('d', pos+1);
}
console.log(positions);


// getter ,setter
var book = {
  _year: 2004,
  edition: 1
};
Object.defineProperty(book, 'year', {
  get: function() {
    return this._year;
  },
  set: function(newValue) {
    this._year = newValue;
    this.edition += newValue - 2004
  }
})
book.year = 2006;
console.log(book.edition);


// 工厂模式
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  }
  return o;
}
var person1 = createPerson('person1');
person1.sayName();
// 构造函数
function Person(name, age, job) {
  this.name = name;
  this.sayName = function() {
    console.log(this.name);
  }
}
var person2 = new Person('person22');
person2.sayName();
// 方法多次生成
function sayName() {
  console.log(this.name);
}
function Person(name){
  this.name = name;
  this.sayName = sayName;
}
var person3 = new Person('person33');
person3.sayName();
// 原型模式
function Person() {
  Person.prototype.name = 'person44';
  Person.prototype.age = '44';
  Person.prototype.sayName = function(){
    console.log(this.name);
  }
}
var person4 = new Person()
console.log(person4.sayName());
// 关于原型的知识点
console.log(Person.prototype.isPrototypeOf(person4));
console.log(Object.getPrototypeOf(person4) == Person.prototype);
person4.hasOwnProperty('name');
console.log('name' in person4);
function hasPrototypeProperty(obj, name) {
  return !obj.hasOwnProperty(name)&&(name in obj);
}
console.log(hasPrototypeProperty(person4, 'name'));
// 假如实例中定义了，原型属性会被屏蔽
person4.name = 'greg';
console.log(hasPrototypeProperty(person4, 'name'));
// 可枚举属性可以用 Object.keys()
var keys = Object.keys(Person.prototype)
console.log(keys);                // ["name", "age", "sayName"]
var person5 = new Person();
var keys2 = Object.keys(person5)
console.log(keys2);               // []
console.log(typeof keys);         // object
var keys3 = Object.getOwnPropertyNames(Person.prototype)
console.log(keys3);               // ["constructor", "name", "age", "sayName"]，不可枚举也能得到
var keys4 = Object.getOwnPropertyNames(person5)
console.log(keys4);               // []

// 原型的动态性
var friend = new Person();
Person.prototype.sayHi = function() {
  console.log('hi');
};
friend.sayHi()
function Person() {}
var friend = new Person();
Person.prototype ={
  name: 'person6',
  sayHi: function() {
    console.log('hi');
  },
  sayName: function() {
    console.log(this.name);
  }
};
friend.sayHi()   //error
friend.sayName() //error
// 区别添加与重写

// 原生对象的原型
String.prototype.startWith = function(str, text) {
  return str.indexOf(text) == 0;
}
var str1 = 'hello ,kugou';
str1.startWith(str1, 'h')
// 书上的方法
String.prototype.startWith = function(text) {
  return this.indexOf(text) == 0;
}
var str2 = 'hey , sbjon';
str2.startWith('hey');

// 最常用的模式，动态原型模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  if (typeof this.sayName != 'function') {
    this.prototype.sayName = function() {     //写错了
      console.log(this.name);
    };
  }
}
var person6 = new Person('person6');
person6.sayName();
// 最常用的模式，动态原型模式（纠正）
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  if (typeof this.sayName != 'function') {
    Person.prototype.sayName = function() {     //正确的
      console.log(this.name);
    };
  }
}
var person6 = new Person('person6');
person6.sayName();

// 寄生模式，假设我们想要个特殊的数组，有额外的方法
function SpecialArray(){
  var arr = new Array();
  arr.push.apply(arr, arguments);
  arr.toPipeString = function(){
    console.log(this.join('|'));
  }
  return arr;
}
var colors = new SpecialArray('blue', 'green', 'black');
console.log(colors.toPipeString());

// 稳妥模式 道格拉斯出品
function Person(name, age, job) {
  var o = new Object();
  o.sayName = function() {
    console.log(name);           //没有this，o没有属性。name属于函数对象的。
  }
}
var person7 = Person('person7');
person7.sayName();                // person7


// 原型继承，原型对象指向函数，实例指向原型对象
function Super(){
  this.property = true;
}
Super.prototype.getSuper = function() {
  return this.property;
}
function Sub() {
  this.subProperty = false;
}
Sub.prototype = new Super();
Sub.prototype.getSub = function() {
  return this.subProperty;
}
var instance = new Sub();
console.log(instance.getSuper());
console.log(Object.prototype.isPrototypeOf(instance));



 // 解决原型链上属性共享的问题。call，apply（借用构造函数）
 function Super(){
   this.colors =['blue', 'green', 'black'];
   this.sayName = function() {
     console.log(this.color);
   }
 }
 function Sub() {
   Super.call(this);                        // 借用属性
 }
 var instance1 = new Sub();
Object.getOwnPropertyNames(instance1);      // ["colors", "sayName"]
instance1.colors                            // ["blue", "green", "black"]
instance1.sayName()                         //  undefined, 还是调用super的方法，作用域不对吧，感觉作用域好麻烦。

 // 组合继承模式：借用继承属性，原型继承方法
 function Super(name) {
   this.name = name;
   this.colors =['blue', 'green', 'black'];
 }
 Super.prototype.sayName =function() {
   console.log(this.name);
 };
 // 属性继承
 function Sub(name, age) {
   Super.call(this, name);
   this.age = age;
 }
 // 方法继承
 Sub.prototype = new Super();
 Sub.prototype.constructor = Sub;           // 这一步不要忘记了,构建器变成sub但是指针还是在super?
 Sub.prototype.sayAge = function(){
   console.log(this.age);
 };
var keys6 = Object.getOwnPropertyNames(Sub.prototype);
console.log(keys6);                         // ["name", "colors", "constructor", "sayAge"]
var keys5 = Object.keys(Sub.prototype);
console.log(keys5);                         // ["name", "colors", "constructor", "sayAge"]
console.log(Sub.prototype.hasOwnProperty('sayName'));
var instance2 = new Sub('instance2', 17);
var keys7 = Object.keys(instance2);
console.log(keys7);                         // ["name", "colors", "age"]
instance2.sayName();
var keys8 = [];
for(key in instance2) {
  keys8.push(key);
}
console.log(keys8);                         // ["name", "colors", "age", "constructor", "sayAge", "sayName"]
instance2 instanceof Sub                    // true
instance2 instanceof Super                  // true
Sub.prototype.isPrototypeOf(instance2);     // true
Super.prototype.isPrototypeOf(instance2);   // true   构建器有什么用？

// 原型式继承，共享所有的属性和方法。
function object(o){
  function f(){}
  f.prototype = o;
  return f;                                  // 这里错了
}
// 纠正
function object(o) {
  function f(){}
  f.prototype = o;
  return new f();
}
// es5规范了这个方法，假如一个参数，效果与object()相同。
Object.create()
// 第二个参数则是与Object.defineProperties()相同，举个例子
var person = {
  name: 'jon',
  friends:['b','t','x','z']
};
var anotherPerson = Object.create(person, {
  name: {
    value: 'lee'                                // 多加了封号
  }
});
console.log(anotherPerson.name);
// 寄生式继承
function createAnother(original) {
  var clone = object(original)
  clone.sayHi = function(){
    console.log('hi' + this.name);
  };
  return clone;
}
var person = {
  name: 'zsb',
  age: 19
}
var zsb = createAnother(person);
console.log(zsb.sayHi());

// 寄生组合继承
// 先写一遍组合继承
function Super(name) {
  this.name = name;
  this.friends = ['blue', 'green', 'black'];
}
Super.prototype.sayName = function() {
  console.log(this.name);
}
function Sub(name, age){
  Super.call(this, name);
  this.age = age;
}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
Sub.prototype.sayHi = function(){
  console.log('hi');
}
var person8 = new Sub('person8', 18);
person8.friends.push('white');
console.log(person8.friends);
var keys9 = [];
for(item in person8) {
  keys9.push(item);
}
console.log(keys9);
// 再记一遍稳妥模式
function Person(name, age, job) {
  var o = new Object();
  o.sayName = function() {
    console.log(name);
  }
  return o;
}
var person9 = new Person('jon' ,19, "front_end");
console.log(person9.sayName());
// 再记yibian原型继承
function object(o) {
  function F(){}
  F.prototype = o;
  return new F();
}
var person10 = {
  name: 'k',
  friends: ['one', 'tow', 'three']
}
var joy = object(person10);
joy.friends.push('jon');
console.log(joy.friends);
// 再来圆形寄生继承
function createAnother(o) {
  var clone = object(o)
  clone.sayhi = function() {
    console.log('hi' + this.name);
  }
  return clone;
}
var person11 = {
  name: 'bom',
  age: 11
};
var joke = createAnother(person11);
console.log(joke.name);
// 终于到这个寄生组合继承
// 寄生组合基本模式
function object(o){
  function F(){}
  F.prototype = o;
  return new F();
}
function inheritPrototype(Sub, Super) {
  var prototype = object(Super.prototype);
  prototype.constructor = Sub;
  Sub.prototype = prototype;
}
function Super(name) {
  this.name = name;
  this.colors = ['blue', 'green', 'black'];
}
Super.prototype.sayName = function() {
  console.log(this.name);
}
function Sub(name, age) {
  Super.call(this, name);
  this.age = age;
}
inheritPrototype(Sub, Super);
Sub.prototype.sayAge = function() {
  console.log(this.name + ' ' + this.age);
}
var person12 = new Sub('jon12', 19);
person12.sayAge();
person12.sayName();







// 当你遇到困惑不知道该怎么办，永远记住:Read-Search-Ask。
