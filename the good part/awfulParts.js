// 全局变量
// 全局申明
var foo = 1;
window.foo    // 1
// 未申明
v = 2
window.v      // 2
// 直接添加在 window上
window.w = 3
w             // 3



// 作用域
// 没有块级作用域
if (true) {
  var t = 0;
}
console.log(t);   // 0



// 自动插入封号
(function(){
  return            // 自动插入封号，返回 undefined
  f = 7
})()



// 保留字
var with = 1        // Uncaught SyntaxError: Unexpected token with



// Unicode
// 16 位没法覆盖所有的



// typeof
typeof null         // "object"
null === null
// 判定null
var n = null
n === null
Object.prototype.toString.call(n)      // "[object Null]"



// parseInt
parseInt('16') === parseInt('16ton')



// +
1 + 2   // 3
1 + '2' // '12'



// 浮点数
0.1 + 0.2 === 0.3    // false
0.1 + 0.2            // 0.30000000000000004



// NaN
var nan = NaN;
Object.prototype.toString.call(NaN)     // "[object Number]"
isNaN(nan)
isNaN('oops')     // true
isNaN('oops')     // true
// 来定义一个判定函数
var isNumNaN = function (num) {
  return Object.prototype.toString.call(num) == '[object Number]' && isNaN(num)
}
isNumNaN(4)
isNumNaN('oops')
isNumNaN(NaN)



// 伪数组
var a = []
a.constructor       // Array      但，不同窗口还是会被判定为 不是
typeof a            // "object"
Object.prototype.toString.call(a)       // "[object Array]"
// 原来arguments也可以检测
(function(){
  return Object.prototype.toString.call(arguments)    // "[object Arguments]"
})()




// 假值
0
NaN
''
false
null
undefined
// 但他们不能互换
var value
if (value == null)     // value 是 undefined  不严格相等可以和null 互换
  alert('done')



// hasOwnProperty
// 原来的没有定义
// var other
// 修改后，定位对象在添加属性
var other = {};
// other.name = 'jon'    // 不能用 name ？   懂了，不能 this 都没定义就添加属性
other.titl = 'jon'
other.hasOwnProperty = null
if (other.hasOwnProperty(name)) {      // Uncaught TypeError: other.hasOwnProperty is not a function(…)
  alert(other.titl)
} else {
  console.log('false');
}



// 对象
// javascript 不会有真的空对象，因为可以从原型链去的成员
