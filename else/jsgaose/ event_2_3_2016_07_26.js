// 事件冒泡和事件捕获
// DOM事件流：1先捕获 2事件目标 3再冒泡
// document - html - body -div -body =html -document

// HTML 事件处理程序
"<input type='button' value='click me' onclick='alert("kkk")'>"
// 可以扩展作用域的 with， try catch

// DOM0 级事件处理程序
var btn = document.getElementById('mybtn');
btn.onclick = function() {
  alert(this.id);
};
btn.onclick = null;          // 删除 DOM0 级点击事件
// DOM2 级事件处理程序
var btn = document.getElementById('mybtn');
btn.addEventListener('click', function(){

}, false);                    //true表示捕获阶段处理，false冒泡阶段处理
// DOM2级可以绑定多个事件
var btn = document.getElementById('mybtn');
btn.addEventListener('click', function() {
  console.log(this.id);
}, false);
btn.addEventListener('click', function() {
  console.log('Hello world');
}, false);
// removeEventListener, 无法移除匿名函数
// 由于匿名函数无法被移除，所以尽量还是用函数申明活着函数表达式

// IE 有类似的 attachEvent, detachEvent
var btn = document.getElementById('mybtn');
btn.attachEvent('onclick', function() {         // 事件多加了一个 on
  console.log(this === window);                 // 也要注意IE的作用域，是全局
});
//添加多个事件，IE触发的顺序和其他 addEventListener 相反


// 跨浏览器写法
var EventUtil = function() {
  addHandler: function(obj, type, handler) {
    if(obj.addEventListener) {
      obj.addEventListener(type, handler, false);
    } else if (obj.attachEvent) {
      obj.attachEvent('on'+type, handler);
    } else {
      obj['on'+type] = handler;
    }
  },

  removeHandler: function(obj, type, handler){
    if(obj.removeEventListener){
      obj.removeEventListener(type, handler, false);
    } else if (obj.detachEvent) {
      obj.detachEvent('on'+type, handler);
    } else {
      obj['on' + type] = null;
    }
  }
};

//事件对象
// 浏览器会将一个 event 对象传入事件处理程序
// 事件的属性／方法 bubbles, cancelable, currentTarget, defaultPrevented, detail, eventPhase,
// preventDefault, stopPropagation, target, trusted, type, view

// 通过一个函数处理多个事件，可以使用type
var btn = document.getElementById('mybtn');
var handler = function(event) {
  switch (event.type) {
    case 'click':
      console.log('clicked');
      break;
    case 'mouseover':
      event.target.style.backgroundColor = 'red';
      break;
    case 'mouseout':
      event.target.style.backgroundColor = '';
      break;
  }
};
btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;
// 阻止默认行为，cancelable 为true的时候，可以使用这个
var link = document.getElementById('mylink');
link.onclick = function(e) {
  e.preventDefault();
}
// 阻止冒泡
var btn = document.getElementById('zh-top-search');
btn.onclick = function(e){
  console.log('The buttn is clicked');
  e.stopPropagation();
}
document.body.onclick = function() {
  console.log('Body is clicked too');
}
// eventPhase
var btn = document.getElementById('zh-top-search');
btn.onclick = function(e) {
  console.log(e.eventPhase);                  //书上是 2， chrome是 3
}
document.body.addEventListener('click', function(e) {
  console.log('body: ' + e.eventPhase);
}, true)
document.body.onclick = function(e) {
  console.log('body_3:' + e.eventPhase);
}

// 因为IE的作用域是全局，所以事件也是
var btn = document.getElementById('zh-top-search');
btn.onclick = function() {
  var event = window.event;
  console.log(event.type);
}
// IE event 的属性和方法
event.cancelBubble = true;        //取消冒泡
event.returnValue = false;        // 取消默认行为
event.srcElement;                 // event.target
event.type
// 新增的兼容事件写法
var EventUtil = {
  getEvent: function(e){
    return e = e || window.event
  },
  getTarget: function(e){
    return e.target || e.srcElement;
  },
  preventDefault: function(e){
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  },
  stopPropagation: function(e) {
    if(e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }
};
// 使用
btn.onclick = function(e){
  e = EventUtil.getEvent(e);          // 这一步是必须的
  EventUtil.stopPropagation(e);
}



// 事件类型
// UI事件大部分和 window 有关
// 1 load事件
支持的 window, image, script, link
image会预加载

// 2 unload 不懂什么意思

// 3 resize， window 相关，最好使用函数节流。
window.onresize = function(){};

// 4 scroll 事件
EventUtil.addHandler(window, 'scroll', function() {
  if (document.compatMode == 'CSS1Compat') {
    console.log(document.documentElement.scrollTop);
  } else {
    console.log(document.body.scrollTop);
  }
})

// 焦点事件
obj.blur()
obj.focus();
obj.focusin();        // 支持冒泡
obj.focusout();       // html事件blur的通用版本

// 鼠标与滚轮事件
obj.mousedown()
obj.mouseup()         // 鼠标释放
obj.dblclick()        // 双击，dom3 事件

// 关于双击的过程
obj.mousedown()
obj.mouseup()
obj.click()
obj.mousedown()
obj.mouseup()
obj.click()
obj.dblclikc()
// 感觉可以定义好多事件
// ie8 以及之前有一个小bug
obj.mousedown()
obj.mouseup()
obj.click()
obj.mousedown()
obj.dblclikc()            // 缺了两部，直接到这里
// 检测是否支持
var isSupported = document.implementation.hasFeature('mouseEvent', '3.0');
console.log(isSupported);

// 位置
event.clientX
event.clientY
event.pageX
event.pageY
event.screenX
event.screenY

// 修改键
event.shiftKey
event.ctrlKey
event.altKey
event.metaKey
// 栗子1
document.body.onclick = function(e){
  if(e.shiftKey){
    console.log('shift');
  }
};
// 栗子2
document.body.addEventListener('click', function(e) {
  if(e.altKey){
    console.log('alt');
  }
}, false)

// 相关元素
// relatedTarget
// 跳过了鼠标按钮
// 滚轮事件，也有函数节流，就可以产生滚屏事件
// IE版本
document.addEventListener('mousewheel', function(e){
  console.log(e.wheelDelta);               // 下拉 －120； 上： 120
}, false)
window.addEventListener('DOMMouseScroll', function(e){
  console.log(e.detail);            // 木有效果
}, false)


// 键盘和文本事件
keydown
keypress
keyup
textInput  // 有一个 event.data 属性
// p380 键码
// 还有字符编码
var btn = document.getElementById('q');
btn.addEventListener('keypress', function(event){
  console.log('你在输入： '+ event.key);
}, false)



// 想要滚屏的话，需要下面的这个属性
// 窗口的高度
document.documentElement.clientHeight   //879
// 页面高度
document.body.clientHeight              //3645
// textInput, 效果与上面的event.key 类似
var btn = document.getElementById('q');
btn.addEventListener('textInput', function(event){
  console.log('你在输入： '+ event.data);
}, false)


// 变动事件
// DOMSubtreeModified, DOMNodeInserted, DOMNodeREmoved, DOMNodeInsertedIntoDocument
// DOMNodeREmovedFromDocument, DOMAttrModified, DOMCharacterDataModified
// 检测是否支持
var isSupported = document.implementation.hasFeature('MotationEvents', '2.0');
console.log(isSupported);               // chrome: true
// 在使用 removeChild(), replaceChild(), 从 DOM 删除节点，首先触发 DOMNodeREmoved 事件，事件目标
// event.target 就是被删除的节点，而 event.relatedNode 属性包含对包含对目标父节点的引用
// 假如body下的ul要移除: 1. ul (DOMNodeREmoved), 2. ul (DOMNodeREmovedFromDocument),
// 3. li(DOMNodeREmovedFromDocument), 4. body(DOMSubtreeModified)

// HMTL5 事件
// contextmenu
window.addEventListener('contextmenu', function(e){
  e.preventDefault();
}, false)
// beforeunload
window.addEventListener('beforeunload', function(e){
  console.log('done');
   e = e || window.event;
  var message = 'Do you reary want close this page';
  e.returnValue = message;                  // 删除这个导致，没作用
  return message;
},false)
// DOMContentLoaded，chrome 有效果
document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM is ready now.');
  console.log(document.documentElement.clientHeight);
}, false)
// 不支持该事件的可以使用一个超时0秒调用，但效果不一定有
setTimetout(function() {
  'Do something';
}, 0)

// pageshow, pagehide
(function() {
  var showCount = 0;
  window.addEventListener('load',function(){
    console.log('Load fired');
  }, false);
  window.addEventListener('pageshow', function() {
    showCount++;
    console.log('You has fired ' + showCount + ' times!');
  }, false);
})();
// 另外 pageshow 还有一个 event.persisted 属性
window.addEventListener('pagehide', function(){
  alert('Page hide');
  console.log('Page hide');
},false);

// hashchange 监测url参数，用于 ajax；两个属性：oldURL，newURL。
// 两个属性支持的浏览器不多，所以配合 location.hash 更好
window.addEventListener('hashchange', function(e){
  console.log(e.oldURL);
  console.log(e.newURL);
}, false)


// 设备事件 ,chorme 上面没法测试
// orientationchage
window.orientation          // chrome: undefined
console.log(window.orientation);

// 触摸与手势事件
touchstart
touchmove
touchend
touchcancel

function handleTouchesEvent(event) {
  // 跟踪一次触摸
  if(event.touches.length == 1) {
    switch (event.type) {
      case 'touchstart':
        console.log('touchstart: ' + event.touches[0].clientX + ', ' + event.touches[0].clientY);
        break;
      case 'touchend':
        event.preventDefault();
        console.log('touchend: ' + event.changedTouches[0].clientX +', ' + event.changedTouches[0].clientY);
        break;
      case 'touchmove':
        event.preventDefault();
        console.log('touchmove: ' + event.changedTouches[0].clientX +', ' + event.changedTouches[0].clientY);
        break;
    }
  }
}
document.addEventListener('touchstart', handleTouchesEvent, false);
document.addEventListener('touchend', handleTouchesEvent, false);
document.addEventListener('touchmove', handleTouchesEvent, false);
//一起写 touchend 没效果, 好奇怪
var startX = 0,
    startY = 0,
    endX = 0,
    endY = 0,
    distanX =0,
    distamY =0;
document.addEventListener('touchstart', function(){
  console.log('touchstart: ' + event.touches[0].clientX +', ' + event.touches[0].clientY);
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}, false)
document.addEventListener('touchend', function(){
  console.log('touchend: ' + event.changedTouches[0].clientX +', ' + event.changedTouches[0].clientY);
}, false)
document.addEventListener('touchmove', function(){
  console.log('touchmove: ' + event.changedTouches[0].clientX +', ' + event.changedTouches[0].clientY);
  endX = event.changedTouches[0].clientX;
  endY = event.changedTouches[0].clientY;
  distanX = Math.abs(endX - startX);
  distamY = Math.abs(endY -startY);

  if(distanX > distamY){
      event.preventDefault();
      alert('可以弹出窗口了');
  }
}, false)

// 手势事件
// gesturestart
// gesturechage
// gestureend
// 主要有两个属性 rotation, scale
event.rotation  // 0 开始，顺时针是正值
event.scale     // 1 开始，变大正值


// 内存与性能，
// 事件委托
document.addEventListener('click', function(e) {
  target = e.target;
  console.log(target.nodeName);
  switch (target.className) {
    case 'question_link':
      console.log('标题');
      e.preventDefault();
      break;
    case 'expandable':
      console.log('内容');          // 子元素和他一样大，没办法点中
      break;
    case 'zm-item-vote-info':
      console.log('赞同');
      break;
  }
}, false);
// 移除事件, 单个
var info = document.getElementsByClassName('zu-top-nav-link')[0];     // 可行～
for(var i =0; i < info.length; i++){
info.style.backgroundColor = 'red';
  info.onmouseenter = function(){
    info.onmouseenter = null;
    info.innerHTML = '没了';
  }
}
// 类，模仿块级作用域
var info = document.getElementsByClassName('zu-top-nav-link');     // 可行～
for(var i =0; i < info.length; i++){
info[i].style.backgroundColor = 'red';
  (function(i){
    var num = i;
    info[num].onmouseenter = function(){
      info[num].onmouseenter = null;
      info[num].innerHTML = '没了';
    }
  })(i)
}
// onload 和onload事件，结合事件委托，给页面卸载的时候，移除所有的事件


// 模拟事件
// 创建模拟鼠标事件
var e =document.createEvent('MouseEvents')
e.initMouseEvent('好多的参数')
obj.dispatchEvent(e)
// 模拟键盘事件
if (document.implementation.hasFeature('KeyboardEvents', '3.0')) {  // chrome:支持
  var e = document.createEvent('KeyboardEvent')  // 为什么不是负数
  e.initKeyboardEvent('好多参数')
}
obj.dispatchEvent(e);

// 其他事件：
// 自定义事件
