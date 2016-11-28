// BOM
// 理解window对象，BOM的核心
// 控制窗口，框架和弹出窗口
// 利用location 对象中的页面信息
// 利用navigator 对象了解浏览器

// window对象：
//   1. javascript访问浏览器接口的一个接口
//   2. 又是ECMAScript规定的 Global 对象
//   这意味着网页中定义的任何一个对象、变量和函数，都以 window 作为其Global 对象，
//   因此有权访问 parseInt() 等方法

// 全局作用域
var age = 29;
function sayAge() {
  console.log(this.age);
}
console.log(window.age);
sayAge();
window.sayAge();                        // 任何全局的属性／方法都属于 window
// 全局定义的不能被删除，但window上定义的属性可以被删除
var age = 29;
window.color = 'blue';
delete age;
console.log(age);                       // 29，无法被删除
console.log(window.color);              // blue
delete window.color;
console.log(window.color);              // undefined，说明成功被删

// 还是要用这个的firefox还是不支持screenLeft,而且ie 与其他浏览器计算方法不一致
var leftPos = (typeof window.screenLeft == 'number')?window.screenLeft:window.screenX;
var topPos = (typeof window.screenTop == 'number')?window.screenTop:window.screenY;
// 用moveTo和moveBy移动的效果是一致的。但尝试了下，默认被禁用了
window.moveTo(0, 0);
window.moveBy(-100, 50);

// 浏览器窗口大小outerWidth, outHeight, innerWidth, innerHeight
// 由于各个浏览器对这四个参数的解释不一样
console.log(window.innerWidth);                   // 1103, chrome, pc端多了滚动条
console.log(document.documentElement.clientWidth);// 1088, chrome
console.log(document.body.clientWidth);           // 1088, chrome
// 兼容写法
var pageWidth = window.innerWidth;
    pageHeight = window.innerHeight;
if (typeof pageWidth != 'number') {
  if (document.compatMode == 'CSS1Compat') {        // 第十章讨论
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }                                                 // if else 不需要封号？
}
// 另外还有resizeTO, resizeBy, 只能用于最外层框架，默认禁用
window.resizeTO(100, 100);                          // 调整到100，100
window.resizeBy(100, 40;)                           // 调整到200，140

// 导航和打开窗口
// window.open() 有四个参数
// 第一个参数是url
window.open('http://www.jon23.top');
// 第二个参数是已有的窗口或框架的名称，单机 <a> 链接相当于第二个参数  'topFrame'
// 可以设置的特殊窗口名称 : _self, _parent, _top, _blank
// 如果不是已有的名称，则会根据参数，创建一个该名称的新窗口或标签页
window.open('http://www.jon23.top', 'topFrame');
// 第三个参数是新页面的属性，适用于弹出窗口
window.open('http://www.jon23.top', 'topFrame', 'height=400,width=400,top=10,resizable=yes');
// 第三个参数是新页面的属性，适用于弹出窗口
var wrox = window.open('http://www.jon23.top', 'wrox', 'height=400,width=400,top=10,resizable=yes');
wrox.resizeTO(600, 600);                      // chrome 提示 not a function
wrox.moveTo(200,200);
wrox.close();                                 // 有作用
// 还有一个 closed 属性
wrox.closed;                                  // true
// 还有一个opener属性，如果需要页面件不需要通信，打开的新窗口手动设置
wrox.opener = null;

// 弹出窗口屏蔽
var wrox = window.open('http://www.zhihu.com', '_blank');
if (wrox == null) {
  alert('弹出新页面被屏蔽');
}
// 如果是扩展或者其他程序关闭的，就会跑出一个错误，则可以把 window.open() 封装到 try catch 中
var blocked =false;
try {
  var wrox = window.open('http://www.zhihu.com', '_blank');
  if (wrox == null) {
    blocked = true;
  }
} catch (ex) {
  blocked = true;
}
if (blocked) {
  alert('The popup is blocked');
}


// 间歇调用和超时调用， 这个也是BOM呀？
// 不建议方式
setTimeout('alert("jon")', 1000);
// 推荐方式
setTimeout(function() {
  alert('jon2');
}, 1000);
// 调用setTimeout, setInterval, 会返回一个id, 利用这个id可以取消他们
var timeId = setTimeout(function(){
  alert('hello, world');
},1000)
clearTimeout(timeId);
// setInerval 的常用方式
var num = 0,
    max = 10,
    intervalId = null;
function interval() {
  console.log(num);
  num++;
  if(num > max) {
    clearInterval(interval);
    console.log('done');
  }
}
// intervalId = setInterval(function(){
//   interVal();
// }, 500);
// 这里可以更简洁一点
interval = setInterval(interval, 500);                // 原来直接用指针就可以的？
// 间歇调用一般都可以用超时调用来模拟，且效果比间歇调用要好。
// 因为后一次间歇调用，可能在前一次间歇调用结束前启用了
// 上面的栗子
var num = 0;
var max = 10;
while (num < max) {
  setTimeout(function() {                             // 不能在
    num++;
    console.log(num);
  }, 500);
}
console.log(num);
// 出错了 ！！！！！！！！！
// 假如
var num = 0;
var max = 10;
while (num < max) {
    num++;
    console.log(num);
}
console.log(num);
// 书上的正确方式
var num = 0;
var max = 10;
function increment() {
  console.log(num);
  num++;
  if (num < max) {
    setTimeout(increment, 500)
  } else {
    console.log('done' + num);
  }
}
// increment()
setTimeout(increment, 500);


// location
// 查询字符串
function getQueryStringArgs() {
  var qs = (location.search.length > 0)?location.search.substr(1):'',
      items = qs.length?qs.split('&'):[],
      item = null,
      name = null,
      value = null,
      len = items.length,
      args = {};
  for(var i = 0; i < len; i++) {
    item = items[i].split('=');
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length > 0) {
      args[name] = value;
    }
  }
  return args;
}
// https://www.zhihu.com/careers/161?q=java&num=10
var qsArgs = getQueryStringArgs();
console.log(qsArgs['q']);                         // java
// 位置操作
location.assign('http://www.zhihu.com')
window.location = 'http://www.zhihu.com'
location.href = 'http://www.zhihu.com'
// 修改location的属性每次都会页面重新加载，hash除外
location.pathname = 'myway';        // http://www.zhihu.com/myway/
// 使用replace不会在历史记录中产生
location.replace('http://www.baidu.com')                // chrome中有记录。。。
location.reload()                                       // 这个可以用的比较多


// navigator
// 用的最多的就是 navigator.userAgent
var ua = navigator.userAgent;
console.log(ua);
// 插件检测
function hasPlugin(name) {
  name = name.toLowerCase();
  for (var i=0; i < navigator.plugins.length; i++) {
    if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
      return true;
    }
  }
  return false;
}
hasPlugin('flash');
// IE检测就跳过了，212页
// 注册处理程序也跳过

// screen 事件，编程中用处不大。


// history
history.go()
history.go(-1)
history.go(2)
history.go(0)                                //刷新
history.go('zhihu.com')                      // 跳到最近的zhihu.com页面
history.back()                               // 等价 history.go(-1)
history.forword()                            // 等价 history.go(1)
history.length                               // 表页签的历史，新建的标签页 等于1
