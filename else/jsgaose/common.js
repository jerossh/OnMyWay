// 数组分块
function chunk(array, process, context) {
  setTimeout(function(){
    var item = array.shift();
    process.call(context, item)
    if(array.length>0) {
      setTimeout(argument.callee, 100);
    }
  }, 100)
}
// 栗子
var arr = [1,2,3,4,5,6,23]
function printInfo(item) {                // 就是 上面的process
  var div = document.getElementById('target');
  div.innerHTML += item +'<br>'
}
chunk(arr, printInfo)


// 函数节流
var processor = {
  timeoutId: null;
  performProcessing:function(){
    // 实际处理程序
  }
  process: function(){
    clearTimeout(timeoutId)
    var that = this
    setTimeout(function() {
      that.performProcessing()
    }, 100)
  }
}; processor.process()
// 简化版本
function throttle(method, context){
  clearTimeout(method.tid)
  method.tid = setTimeout(function() {
    method.call(context)
  }, 100)
}
// 栗子
function resizeDiv() {
  var div = document.getElementById('id')
  div.style.height = div.offsetWidth + 'px'
}
window.onresize = function() {
  throttle(resizeDiv)
}

// undefined 未定义
// null 空对象指针
// 执行环境是javascript最重要的一个概念
// 当代码执行，会产生一个作用域链，保证有序访问，最开始的活动对象arguments
// 延长作用域链： catch，with

var str = 'dfsfdfsdfsdfshgd';
var positions = [];
var pos = str.indexOf('d');
while(pos>-1) {
  positions.push(pos);
  pos = str.indexOf('d', pos + 1);
}
console.log(positions);


var text= 'go to die';
var result = text.replace('go', 'come');
console.log(result);


// getter, setter
var book = {
  _year: 2004,
  edition: 1
};
// 这边在定义一个year
Object.defineProperty(book, 'year', {
  get: function() {
    return this._year;
  },
  set: function(newValue) {  //  newValue这是啥，写入的时候倒入的？
    this._year = newValue;
    this.edition += newValue - 2004;
  }
});
book.year =2005;
console.log(book.edition);

// 定义多个属性，定义的方式都不一样；
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {            // 想一下，还真不好直接用year来处理editor
    get: function() {
      return this._year;
    },
    set: function(newValue) {
      this._year = newValue;
      this.edition += newValue - 2004
    }
  }
})

// 工厂模式
function createPerson(name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function() {
    alert(this.name)
  }
  return o;
}

// 构造器模式
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function(){
    alert(this.name)
  }
}
// 解决sayname多次生成的办法之一
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = sayName
}
function sayName() {
  console.log(this.name);
}


// 原型模式，也是构造器的一种
function Person() {
  Person.prototype.name = 'name'
  Person.prototype.age = 'age'
  Person.prototype.job = 'job'
  Person.prototype.sayName = function() {
    console.log(this.name);
  }
}
var person1 = new Person();
console.log(Person.prototype.isPrototypeOf(person1));  // 测试是否是原型
console.log(Object.getPrototypeOf(person1) ==  Person.prototype);  // 还是第一种短一点
person1.hasOwnProperty('name')    // false，name是原型上的
person1.hasOwnProperty('age')     // 同上
console.log('name' in person1);   // 无论原型还是实例，属性都会在in中
// 检查是在原型中
function hasPrototypeProperty(object, property) {
  return !object.hasOwnProperty(property)&&(property in object)
}
hasPrototypeProperty(person1, 'name')    // ture
person1.name = 'greg';
hasPrototypeProperty(person1, 'name')  // false
// 可枚举属性
var keys = Object.keys(Person.prototype)
alert(keys)
// 更简单的原型语法
function Person(){};
Person.prototype = {
  constructor: Person
  name: 'name'
  age: 'age'
  job: 'job'
  sayName: function() {
    console.log(this.name);
  }
}
// 解决constructor可枚举的问题，使用Object.defineProperty
function Person(){};
Person.prototype = {
  name: 'name'
  age: 'age'
  job: 'job'
  sayName: function() {
    console.log(this.name);
  }
}
Object.defineProperty(Person, 'constructor' {
  enumerable: false,
  value: Person
})
// 原型重写会产生新的原型


// 原生对象的原型
String.prototype.startWith = function(text, str){
  return str.indexOf(text) == 0
}
var str = 'hello, jon'
str.startWith('hello')


// 原型对象的问题
function Person(){
}
Person.prototype = {
  friends: ['tt', 'kk']       // 对引用类型的属性不好
}
var lili = new Person()
var lucy = new Person()
lili.friends.push('bb')
lucy.friends.push('aa')
console.log(lucy.friends);    // 都变成lucy的朋友了
// 解决方案是构造函数与原型模式一起
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
Person.prototype = {
  constructor: Person,
  sayName: function() {
    console.log(this.name);
  }
}
// 最好的办法是 动态原型模式
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  if (typeof this.sayName != 'function') {
    this.prototype.sayName = function() {
      console.log(this.name);
    }
  }
}
// 寄生构造函数其实就是工厂模式 ＋ new
function SpecialArray() {
  var Values = new Array();
  Values.push.apply(Values, arguments)
  Values.toPipeString = function() {
    return this.join(',')
  }
  return Values
}
var colors = new SpecialArray('blue', 'green', 'black')
console.log(colors.toPipeString());


// 稳妥模式
function Person(name, age, job) {
  var o = new Object();
  o.sayName = function(){
    console.log(name);     //会追溯到参数里的name
  }
  return o;
}
var friend = Person('jon');
console.log(friend.sayName());



$(document).ready(function() {

   $("#getMessage").on("click", function() {
      $.getJSON("/json/cats.json", function(json) {

       var html = "";
       // Only change code below this line.
       json.forEach(function(val){
         var keys = Object.keys(val);
         html += "<div class='cat'>";
         keys.forEach(function(key) {
           html += "<b>" + key +"<b>:"+val[key] +"<br>";
         });
         html +="</div><br>";
       });
       // Only change code above this line.

        $(".message").html(html);

      });
   });
 });
