// DOM2 DOM3
// importNode()
var newNode = document.importNode(oldNode, true);       //导入节点和子节点
document.body.appendChild(newNode);                     //直接appendChild就可以了吧？
// defaultView属性
// createDocumentDoctype, createDocument方法

// document.implementation 新增了 createHTMLDocument ,用来创建一个hmtl文档
// 参数是文档标题，包含有hmtl head title body

// 新增 isSupport() 方法 与 document.implementation.hasFeature 类似

// isSameNode, isEqualNode 方法， 同一个是 isSameNode, 类似的是 isEqualNode

document.body.setUserData('name', 'nicholas', function() {});
var value = document.body.getUserData('name');

var iframe = document.getElementById('id');
iframeDoc = iframe.contentDocument;
// 为了兼容ie8
iframeDoc = iframe.contentDocument || iframe.contentWindow.document;


// 样式
// style 的属性太多了
// 计算的样式
// document.defaultView 上的方法 getComputedStyle()
// 第一个参数：元素；第二个参数：伪类
var oCss = document.defaultView.getComputedStyle(obj, null);
console.log(oCss.backgroundColor);
// 兼容IE
var oCSS = obj.currentStyle
// 所以兼容写法是
function getStyle(obj, name){
  if(obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return document.defaultView.getComputedStyle(obj, null)[name];
  }
}

// 确定元素大小   跳过////
obj.getBoundingClientReat();
// 提供top ,right, bottom left

// DOM遍历，提供了两个 NodeItrator, TreeWalker


// 范围   跳过／／／／／／
var range = document.createRange()
