// 私有变量和私有函数
function MyObject() {
  var privateVarialble = 10;
  function privateFunction() {
    return false;
  }
  this.publicMethod = function() {
    privateVarialble++;
    return privateFunction();
  };
}
// 可以隐藏那么些不应该直接被修改的数据
function Person(name) {
  this.getName = function() {
    return name;                         // 类似稳妥模式，不加this，直接返回 name
  }
  this.setName = function(value) {
    name = value;
  }
}
var person = new Person('jon');
person.getName();
// 如果这样
function Person(name) {
  this.getName = function() {
    return name;                         // 类似稳妥模式，不加this，直接返回 name
  }
}
var person = new Person('jon');
person.getName();
// 也就是说下面的代码是用来修改名字的方法而已
this.setName = function(value) {
  name = value;
}
// 静态私有变量，大概模式如下
(function() {
  var privateVarialble = 10;
  function privateFunction() {
    return false;
  };
  Myobject = function() {

  }
  Myobject.prototype.publicMethod = function() {
    privateVarialble++;
    return privateFunction();
  }
})();
 // 这个模式与构造函数中的定义特权方法的主要区别是
(function() {
   var name = '';
   Person = function(value) {
     name = value;
   };
   Person.prototype.getName = function(){
    //  return this.name;
    return name;
   };
   Person.prototype.setName = function(value) {
      this.name =value;
   };
})();
var person1 = new Person('jon');
console.log(person1.getName());
person1.setName('greg')
console.log(person1.getName());
var person2 = new Person('kkk');
console.log(person2.getName());
console.log(person1.getName());

// 模块模式
var singleton = {
  name: value,
  method: function(){
  }
}
// 模块模式通过为单列添加似有变量和特权方法能够使其得到增强
var singleton = function() {
  var privateVarialble = 10;
  function privateFunction() {
    return false;
  }
  return {
    publicProperty : true,
    punlicMethod : function() {
      privateVarialble++;
      return privateFunction()
    }
  };
}();
// 栗子，初始化，私有变量
var appliction = function() {
  var components = new Array();               // 使用变量和函数
  components.push(new BaseComponent);         // 初始化变量
  return {
    getComponentCount: function() {
      return Component.length;
    },
    registerComponent: function(component) {
      if (typepf component == 'object') {
        components.push(component)
      }
    }
  };
}();
// 增强的模块模式，基本各式
var singleton = function() {
  var privateVarialble = 10;
  function privateFunction() {
    return false;
  }
  var object = new Custem();                  // 创建对象
  object.publicProperty = true;
  object.publicMethod = function() {
    privateVarialble++;
    return privateFunction()
  };
  return object;                              // 最后返回
}
// 都没讲这个的用刀的地方，看来以后还要多看几遍才行
// 增强模块的简单栗子
var appliction = function() {
  var components = new Array();
  components.push(new BaseComponent());
  var app = new BaseComponent();
  app.getComponentCount = function() {
    return components.length;
  };
  app.registerComponent = function(component) {
    if (typepf component == 'object') {
      components.push(component);
    }
  };
  return app;
}();
// 模块模式，还是不懂呢。
