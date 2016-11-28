// 函数表达式
// if else 里的同一个函数申明，一般直接返回第二个，无视条件


// 函数以值的形式返回
function createCompareFunction(property) {
  return function(object1, object2) {
    var value1 = object1[property];
    var value2 = object2[property];
    if(value1 > value2) {
      return 1;
    } else if (value1 == value2) {
      return 0;
    } else {
      return -1;
    }
  };
}


// 递归
// 不赋值的模式下可以用的递归函数
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
// 非严格模式下
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
// 严格模式下，用命名函数表达式
var factorial = (function F(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * F(num - 1);
  }
});

// 开始讲闭包了
// 记得销毁闭包
var compareNames = createCompareFunction('name');
var result = compareNames({object: 'nico', object2: 'kk'});
compareNames = null;               // 销毁，不占用内存
// 闭包与变量
function createFunctions() {
  var result = [];
  for (var i = 0; i < 10; i++) {
    result[i] = function() {      //闭包最能取得最好的值。所以需要传递进去
      return i;
    }
  }
  return result;
}
createFunctions()                 //由于作用域链的原因，结果不是我们想的 
// 自己尝试的版本
function createFunctions() {
  var result = [];
  for(var i = 0; i < 10; i++) {
    result.push(i);
  }
  return result;
}
createFunctions()
// 修正版本
function createFunctions(){
  var result = [];
  for (var i = 0; i < 10; i++) {
    result[i] = (function(num) {
      return num;
    })(i)
  }
  return result;
}
createFunctions();


// this 的章节来了
var name = "The window";
var object = {
  name: 'The object',
  getNameFunc: function(){
    return function() {
      return this.name;
    }
  }
};
// 作用域保存起来
var name = "The window";
var object = {
  name: 'The object',
  getNameFunc: function(){
    var that = this;
    return function() {
      return that.name;
    }
  }
};
object.getNameFunc()();

// 模仿块级作用域
function outputNumber(count) {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
  alert(i);
}
outputNumber(3);
// i 即使重新申明了，还是不会改变他的值
function outputNumber(count) {
  for (var i = 0; i < count; i++) {
    console.log(i);
  }
  var i;                          // 重新申明
  alert(i);
}
outputNumber(3);
// 用立即执行函数来模仿块级作用域
// i 即使重新申明了，还是不会改变他的值
function outputNumber(count) {
  (function(){
    for (var i = 0; i < count; i++) {
      console.log(i);
    }
  })()
  alert(i);                       // i is not defined
}
outputNumber(3);
