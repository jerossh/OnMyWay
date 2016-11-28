// 跨文档消息传递 核心是 postMessage()
// 接受两个参数： 一个消息 和 消息接收方的域名
var iframeWindow = document.getElementById('myframe').contentWindow;
iframeWindow.postMessage('A secret', 'http://www.wrox.com');
// 向内嵌的框架发送一条信息，指定框架源于 http://www.wrox.chrome
// 接收到信息会触发 window 上面的 message 事件
// onmessage包含三个重要信息： data ，origin, source
window.addEventListener('message', function(e){
  if (e.origin == 'http://www.wrox.com') {
    processMessage(e.data);
    e.source.postMessage('Received', 'http://p2p.wrox.com');   // 可选，发送回执
  }
}, false);
// event.source 大多数情况下知识 window 的代理，并非真正的对象，所以无法从这个代理中访问其他信息
// postMessage 第一个永远是字符串，可以考虑用 JSON.stringify(),传到信息后用 JSON.parse() 解析
// XDM 有独立规范 叫做 Web Messaging, 非常合适各个框架间的 信息 传递


// 拖放事件
dragstart
drag
dragend
// 某个元素被拖放到有效目标的时候，发生的过程
dragenter
dragover
dragleave/ drop
// 让原本不可以放置目标，重写 dropover, dropenter, 就可以变成有效放置目标
var droptarget = document.getElementsByClassName('return-to-jobs-list')[0];
droptarget.style.backgroundColor = 'red';
droptarget.addEventListener('dragover', function(e) {
  e.preventDefault();
}, false);
droptarget.addEventListener('dragenter', function(e) {
  e.preventDefault();
}, false);
// 火狐浏览器 drop 还有一个默认事件，阻止打开链接
droptarget.addEventListener('drop', function(e) {         // 转为火狐设置
  e.preventDefault();
}, false);

// dataTransfer 对象
// dataTransfer 里面的数据只有在 ondrop 的时候才能读取
event.dataTransfer.setData('text', '这是文本');           // 还有一个 url，在html5: text/plain, text/uri-list
var text = event.dataTransfer.getData('text');
var dataTransfer = event.dataTransfer;
var url = dataTransfer.getData('url') || dataTransfer.getData('text/uri-list');  //这个优点难记
var text = dataTransfer.getData('Text');

// 被拖动的元素： dropEffect; 放置目标接收什么： effectAllowed
none                    // 文本框外所有元素的默认值
move                    // 拖动元素移动到这里
copy                    // 拖动元素，复制到这里
link                    // 放置这里的链接会被打开
// dropEffect 属性在 dropenter 事件中 针对放置目标设置
// dropEffect 要搭配 effectAllowed 才有效果
// effectAllowed 要 ondragstart 事件中设置
// 一定要找机会实践一下，否则整的浪费了一个小时了
// 试试移动文本框的内容到 div

// 可拖动
// html 的 dragable = 'true'

// 两个媒体元素就是需要的时候在查询
// 学习资料：https://developer.mozilla.org/en-US/docs/Web/Events/dragstart


// 历史状态管理
history.pushState()             // 将url添加到历史记录中
history.popState()              // 后退按钮～～～
history.replaceState()          // 将指定的url替换当前的url
// 能够无刷新改变页面，支持前进后退
var state = {
	title: title,
	url: options.url,
	otherkey: othervalue
};
window.history.pushState(state, document.title, url);
// 后退
window.addEventListener('popstate', function(e){
  if (history.state){
	var state = e.state;
    //do something(state.url, state.title);
  }
}, false);
// 无法跨域
