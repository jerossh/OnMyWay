//先设计最通用的方案，然后在使用特定于浏览器的技术增强方案。

// 基本模式
if (object.propertyINQuestion) {
  // 使用 object.propertyINQuestion
}
// 早期使用getElmentId
function getElement(id) {
  if (document.getElementById){
    return document.getElementById(id);
  } else if (docuemnt.all) {
    return document.all[id]                      //中括号
  } else {
    throw new Error('No way to retrieve element');
  }
}
// 检测实际要用的特性
// 更可靠的能力检测
// 先来一个错误做法的🌰
function isSort(object) {
  return !!object.sort            //这不是能力检测，如果该对象有sort属性也会返回 true
}
var result = isSort({sort: true});
console.log(result);
// 更好的栗子是这样子的，但ie8之前的版本依旧会出问题， 是object 而不是fucntion
function isSort(object) {
  return typeof object.sort == 'function';       // ie8 会返回false，ie9 正确
}
// 为了迁就 IE8 可以使用下面的这个函数来检测
function isHostMethod(object, property) {
  var t = typeof object[property];
  return t == 'function' || !!(t == 'object' && object[property]) || t == 'unknown';  //第二个什么意思
}
isHostMethod(location, 'assign');                 // true
isHostMethod(location, 'foobar');                 // false
// 怪癖检测
var hasdontEnumQuirk = function() {
  var o = {toString: function() {}};
  for (var prop in o) {
    if(prop == 'toString') {
      return false;
    }
  }
  return true;
}();

// 用户代理检测
// 又是ie，然后是webikt
var ua = navigator.userAgent.toLowerCase();
if (/chrome\/(\S+)/.test(ua)) {
  var ver = RegExp['$1'];
}
console.log(ver);

// 识别平台
var ua = navigator.userAgent.toLowerCase();
var az = /[a-z]/
var plat = az.exec(ua.split(' ')[1]);
console.log(plat);


// DOM
// document > html > head, body >
// node 类型
// 1 元素节点
// 3 文本节点
// 比较节点
if (someNode.nodetype == 1) {
  value = someNode.nodeName;            // nodeName 是元素标签名称
}
// 节点关系
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.length;
// 操作节点, appendChild, insertBefore, replaceChild, removeChild, cloneNode
var returndNode = someNode.appendChild(newNode);
returndNode == newNode;                 // true
someNode.lastChild == newNode;          // true
// insertBefore ，两个参数，要插入的节点和参照节点
// 最后一个节点
someNode.insertBefore(newNode, null);
// 插入后编程第一个节点
someNode.insertBefore(newNode, someNode.firstChild);
// 替换第一个节点
someNode.replacechild(newNode, someNode.firstChild);
// 移除第一个节点
someNode.removeChild(someNode.firstChild);
// 深复制，复制整个树结构；浅复制，复制节点本身
var shallowList = mylist.clone(false);
shallowList.childNodes.length            // 0,浅复制
// IE之前的版本不会创建空白节点，所以 childNodes.length 和其他浏览器不一样


// document节点
var html = document.documentElement;
html === document.childNodes[0]           // true
html === document.
// 常用的还有
document.body
document.doctype                          // 用处不大
document.URL                              // like loacaiton.href
document.domain                           // like location.host
document.referrer

// dom一致性检测 document.implementation提供的 hasFeature属性
document.implementation.hasFeature()

// 文档写入
document.write()
document.writeIn()                        // 末尾添加 \n 换行

// Element 类型
// tagName, nodeName 返回相同的内容

// 属性相关
getAttribute(), setAttribute()

// attribute属性
Element.attributes.getNameItem('id').nodeValue
Element.attributes['id'].nodeValue
// 设置
Element.attributes['id'].nodeValue = 'something'
// 属性遍历， 用到 nodeName, nodeValue

// 创建元素, 在 html 中是不区分大小写的
var div = document.createElement('div');
div.className = 'append';
// 然后可以用操作节点的方式添加进去，IE 7 动态添加的额一些属性不能用，所以要createElement中一起性填好
// 创建文本节点
var text = document.createTextNode('我是添加的。');
div.appendChild(text)
document.body.appendChild(div);
// 合并动态创建的文本节点
Element.normalize();
// 分割文本节点
var newNode = Element.firstChild.splitText(5);      // newNode 截取第五个文本以后的字段
// 创建临时仓库的方法
var fragment = document.createElementFragment();    //把循环的内容放入这个里面，以前都弄错了


// DOM操作技术
// 动态添加js
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'client.js';
document.body.appendChild(script);
// 添加多个的话，可以写成函数
function loadjs(url) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  document.body.appendChild(script);
}
loadjs('client.js');
// 另外也可以使用 document.createTextNode 来生成js代码不过在早起ie版本中不能执行
// 但可以用script.text 来解决，下面的try catch就是个解决方案
function loadScriptString(code) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  try {
    script.appendChild(document.createTextNode(code));
  } catch {
    script.text = code;
  }
  document.body.appendChild(script);
}
loadScriptString('function(){alert("go!")}');
// 动态样式添加
link.rel = 'stylesheet';
var head =document.getElementsByTagName('head')[0];
style.stylesheet.cssText = css;                 // try catch

// 操作表格
