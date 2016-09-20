// 构造函数迷思

// 普通构造（如果没有new）
function T(name, age) {
  this.name = name;
  this.age = age;
  this.go = function(){
    console.log('go');
  };
}
var t1 = T('tt', 22);
t1.name;      // VM1620:10 Uncaught TypeError: Cannot read property 'name' of undefined
// new 来创建构造函数，背地里创建一个连接到该函数的 prototype 成员的新对象，同时this会被绑定到哪个新对象上
// 所以需要new
var t1 = T('tt', 22);


// 组合构造和原型
function T(name, age) {
  this.name = name;
  this.age = age;
}

t.prototype = {
  constructor: T,    // 变成可枚举
  go: function() {
    console.log('go');
  }
};

// 动态原型
function T(name, age) {
  this.name = name;
  this.age = age;
  t.prototype.go = function(){
    console.log('go');
  };
}

var  t2 = new t('tt', 22);
t2.go();

// 原型继承知识浅复制
function object(o) {
  function F(){}
  F.prototype = o;
  return new F();
}
