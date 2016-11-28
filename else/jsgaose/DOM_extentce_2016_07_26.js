document.querySelector()            // 返回第一个匹配
document.querySelectorAll()         // 所有的匹配元素，带有属性和方法的Nodelist，类似一组元素快照
// querySelectorAll 也有item() 方法
// 还有一个matcheSelector,但支持的浏览器不多，用于检测该元素是否存在

// 遍历元素， DOM traversal
// 弥补IE与其他的浏览器的差异， 定义了以下，不包含文本和注释节点
childsElementCount
firstElementChild
lastElementChild
previousElementSibling
nextElementSibling
// 再也不用担心文本节点了，支持 IE9以上
// 不用 dom traversal
var i,
    len,
    child = element.firstChild;
while(child != element.lastChild) {
  if (child.nodetype == 1) {
    process(child)
  }
  child = child.nextSibling;
}
// 使用 dom traversal
var i,
    len,
    child = ele.firstElementChild;
while(child != ele.lastElementChild) {
  process(child);
  child = child.nextElementSibling;
}


// HTML5
// 1. getElementsByClassName
document.getElementsByClassName('className')
// 2. classList
// 不使用classList
var classNames = div.className.split(/\s+/);
var i,
    len = classNames.length,
    pos = -1;
for (i =0; i<len; i++) {
  if (classNames[i] == 'user'){
    pos = i;
    break;
  }
}
classNames.splice(i, 1);
div.className = classNames.join(' ');
// classList 包含了 add(), contains(), remove(), toggle(), 不过目前支持的浏览器不多

// 焦点管理
// 新增的 document.activElement 取到最后一个焦点过的焦点元素，默认是 null，
var button = document.getElementById('mybtn');
button.focus();
document.activElement = button;        // true
// 还有 document.hasFocus() 确定文档是否获得了焦点
var button = document.getElementById('mybtn');
button.focus();
document.hasFocus();                   // true
// 尝试下
var hasFocusId = setInterval(function(){
  if (document.hasFocus()) {
    clearInterval(hasFocusId);
    console.log('Done');
  }
}, 100);

// HTMLDocument 的变化
// 1. readyState属性， loading, complete
if (document.readyState == 'complete'){  'Do something' };
// 2. 兼容模式，除了一些 document 属性使用的区别，这个好像意义不大吧 （innerwidth, clientWidth）
if (document.compatMode == 'CSS1Compat'){}
// 3. document.head， 这个html才有？！！
document.head                   // HTML5
document.getElementsByTagName('head')[0];   // before HTML5

// 字符串集合
document.charset                            // 默认 UTF－16，中文都是 UTF－8吧
document.defaultCharset                     // chrome: undefined

// 自定义属性： data-name , 映射到 name
// 可以通过dataset来访问
var name = div.dataset.name;
// 设置值
div.dataset.name = 'value';

// 插入标记, innerHTML, outerHTML, insertAdjacentHTML()
// 1 innerHTML属性
// 2
div.parentNode.replaceChild(p, div);
div.outerHTML = '<p>This is a paragraph</p>';
// 3 insertAdjacentHTML
// 第一个参数有四个选项：beforebegin, aferbegin, beforeend, aferend;
// 第二个是要插入的html内容

// 性能问题，替换前先，手动删除原内容的属性和事件
// 不推荐做法
for (var i = 0; i < value.length; i++) {
  ul.innnerHTML += '<li>' + value[i] + '</li>';     //会引起性能问题
}
// 推荐做法
var itemsHtml = '';
for (var i = 0; i < value.length; i++) {
  itemsHtml += '<li>' + value[i] + '</li>';        // 暂存到 itemsHtml
}
ul.appendChild(itemsHtml);

// scrollIntoView(),
var footer = document.getElementsByTagName('footer')[0];
footer.scrollIntoView();
// 设置焦点也能够 跳到焦点的位置
var searForm = document.getElementById('mock:n')
searForm.focus();


// 专有扩展 了解一下就好
// 文档模式
var mode = dcoument.documentMode;
// children, 只包含元素节点
var childs = element.children;
// contains ，用于检查函数之间的关系，有一个兼容写法 p300
document.documentElement.contains(document.body)      //true，20
// 还有个一个俺码，很复杂1，2，4，8，16
// innerText, outerText 未纳入HMTL5
// 滚动： scrollIntoViewIfNeeded, scrollByLines, scrollByPages




/
