// Ajax 的核心是 XMLHttpRequest
// XMLHttpRequest 对象
// IE 7 之前有各种版本的
var xhr = new XMLHttpRequest();      // IE 7以上

// XHR 的用法
// open() 方法，三个参数：请求类型，请求的URL，是否异步
xhr.open('post', '/newName', false)
// URL 相遇与执行代码的当前页面，；调用 open() 不会真的发送请求，只是启动一个请求以备发送
// 要发送特定的请求
xhr.open('get', 'example.php', false);
xhr.send(null);                       // 不需要发送数据，则null，要发送则填入数据

// 响应后的请求会自动填充到 XHR 对象的属性
responseText                          // 响应主体，返回的文本
responseXML                           // XML类型保存的数据在这里
status                                // HTTP状态
statusText                            // HTTP状态的说明
// 接收到第一步先检查 status 属性，确定是成功返回 , 200 正常； 304 资源未被修改，直接使用缓存
if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
  console.log(xhr.responseText);
} else {
  console.log('Request was  unsuccessful' + xhr.status);
}

// 异步请求，javasript 才能继续执行而不必等待响应。此时应该检测xhr的 readyState  属性
0   // 未初始化。尚未调用 open()
1   // 启动。 已经调用 open, 尚未调用 send()
2   // 发送。已经调用 send() 但未收到响应
3   // 接收。已经收到部分响应数据
4   // 完成。已经收到全部数据，可以在客户端使用
// 每次 readyState 的变化，都会触发一次 onreadyStateChange 事件
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {                               // 事件好像都是小写，没有用驼峰写法
  if (xhr.readyState == 4) {
    if (xhr.status >= 200 && xhr.status < 300 || xhr == 304) {
      console.log(xhr.responseText);
    } else {
      console.log('Request was unsuccessful' + xhr.status);         // 使用实例，不用 this， 因为 事件本身作用域有问题
    }
  }
}
xhr.open('get', 'exaple.txt', true);
xhr.send(null);
// 可以 abort() 取消异步请求
xhr.abort();                                    // xhr的属性不再允许访问，最好在进行解除操作

// HTTP 头部信息
setRequestHeader('name', 'value');              // open 之后， send 之前，两个参数： 头部字段名称和头部字段的值
// 建议自定义 名称
// 可以使用 getRequestHeader() 获取名称
var header = xhr.getRequestHeader('name');      // value
getAllRequestHeader()                           // 可以返回头部长字符串信息

// Get请求
// 注意get请求的查询字符串
xhr.open('get', 'exapl.php?name1=value&name2=Value2', true);
// open 内的url 查询字符串必须经过 encodeURIComponent() 的编码，才能驾到url后面
function addURlParam(url, name, value){
  url += ((url.indexOf('?')==-1) ?'?':'&');
  url += encodeURIComponent(name) +'='+ encodeURIComponent(value);
  return url;
}
// 栗子
var url = 'example.php';
var url = addURlParam(url, 'name', 'Nicholas');
var url = addURlParam(url, 'book', 'Proffessional javasript');
console.log(url);
xhr.open('get', url ,false);

// Post 请求
// ajax 来提交表单
function submitData() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status >= 200 && xhr < 300 || xhr ==304) {
      console.log(responseText);
    } else {
      console.log('Request was unsuccessful' + xhr.status);
    }
  };
  xhr.open('post', 'postexampel.php', true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");    // Content-Type 的值好像可以查询
  var form = document.getElementById('user-info');
  xhr.send(serialize(form));                                                    //必须要学习一下serialize了
}
// 提交成功～～



// XMLHttpRequest 2级别
// FormData，用于表单序列化
var data = new FormData();
data.append('name', 'Nicholas');          // 参数： 键 和 值
// 也可以塞入这个表单
var data2 = new FormData(document.forms[0]);
// 可以直接给 send 使用
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if (xhr.status >= 200 && xhr < 300 || xhr ==304) {
    console.log(responseText);
  } else {
    console.log('Request was unsuccessful' + xhr.status);
  }
}
xhr.open('post', 'example.php', true);
// xhr.setRequestHeader()  不用这个？
var form = document.getElementById('myform');
xhr.send(new FormData(form));

// 超时设定, 2011年的时候也只有IE8 支持
ar xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  try {
    if (xhr.status >= 200 && xhr < 300 || xhr ==304) {
      console.log(responseText);
    } else {
      console.log('Request was unsuccessful' + xhr.status);
    }
  } catch (ex) {
    //  ontimeout 设置的处理程序
  }
}
xhr.open('get', 'timeout.php', true);
xhr.timeout = 1000;
xhr.ontimeout = function() [
  console.log('Request did not return in a second');
]
xhr.send(null);

// ff 引入了 overrideMimeType()，send之前调用
xhr.overrideMimeTYpe('text/xml');


// 进度事件
loadstart           // 接收第一个字节的时候触发
progress            // 接收过程中不断响应
error               // 在请求发生错误的时候触发
abort               // 调用 about() 的时候触发
load                // 接收到完成数据的时候触发
loadend             // 在通信完成活着触发error, abort, load 事件后触发

// load 事件
// 接收完毕后响应 load 事件，所以不用去检测 readyState 了
// 处理程序会接收到一个 event ， target 指向 xhr 对象实例，所以可以访问到 xhr 对象所有的属性与方法
var xhr = new XMLHttpRequest();
xhr.onload = function() {
  if ....
}
xhr.open('get'm 'x.php', true);
xhr.send(null);

// progress 事件
// onprogress 会接收到一个 event, target 就是 xhr 对象，但包含三个额外的属性
lengthComputable      // 进度信息是否可用，布尔值
position              // 表示已经接收的字节
totalSize             // 根据 Content-length 预期的字节数
// 来做一个进度条
var xhr = new XMLHtttpRequest();
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
    console.log(responseText);
  } else {
    console.log('Request was unsuccessful' + xhr.status);
  }
};
xhr.onprogress = function(event) {                    // open 之前调用
  var divStatus = document.getElementById('status');
  if (event.lengthComputable) {
    divStatus.innerHTML = 'Received' + event.position +' of ' + event.totalSize + ' bytes';
  }
};
xhr.open('get', 'latevents.php', true);
xhr.send(null);



// 跨源资源共享 CORS
// 头部添加一个 Origin
Origin http:// www.nczonline.net
// 服务器同意就发回相同的源，公共则发回 “＊”；
Access-Control-Allow-Origin: http://www.nczonline.net
// 请求和响应都不包含 cookie 信息

// IE XMD
// 其他浏览器， XMLHttpRequest 第二个参数使用绝对地址就可以
// 当然也有一些限制，不能发送或接收cookie， setRequestHeader不能定义，getAllRequestHeader返回空


// Preflighted Requests 头部添加好多东西，感觉好复杂
// 带凭据的请求

// 跨浏览器的CROS
function createCORSRequest() {
  var xhr = new XMLHttpRequest();
  if('withCredentials' in xhr) {
    xhr.open(method, url, true);          // 不用 return ？
  }  else if (typepf XDomainRequest != 'undefined') {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;                               // 最后 return
}
var request = createCORSRequest('get', 'http://www.jon23.top/something/');
if (request) {
  request.onload = function() {
    // 对 responseText 进行处理
  }
}
xhr.send(null);

// 其他跨域技术
// 图像ping
var img = new Image();
img.onload =img.onerror = function() [
  console.log('done');
]
img.src = 'http://www.example.com/text?name=Nicholas';
// 图像ping 最多用于用户点击页面或动态广告的曝光次数。


// JSONP
// JSON with padding 应用JSON的一种新写法
callback({"name", "Nicholas"});
// 由两部分组成，回调函数和数据
// http://freegeoip.net/json/?callback=handleReponse
// 通过查询符，来指定回调函数
// JSONP 通过一个动态 script 元素来使用， src可以使用跨域url
// 复习一下 动态script
var script = document.createElement('script');
script.type = 'text/javasript';
script.src = 'www.jon23.top/jonjs/eventutil.js';
document.body.appendChild(script);

function handleReponse(response) {
  console.log('You are at IP address ' + response.ip + ' . which is in '+ response.city);
}
var script = document.createElement('script');
script.src = 'http://freroip.net/json/?callback=handleReponse';                 //如何指定？？
document.body.inserBefore(script, document.body.firstChild);

// Comet，更高级的技术
// Ajax 是页面向服务器请求的技术，Comet是服务器向页面推送的技术
// 有两种实现方式 长轮询、流
// 长轮询     就是页面定时向服务器发送请求，看有没有更新的数据，
// 短轮询是不管有没有更新数据，页面马上响应，长轮询是有更新数据了在响应
// 流整个生命周期只有一个http，通过服务器定时给页面发送信息。
// 所有的服务器端语言都支持打印到输出缓存然后刷新的功能，而这正是http流的关键所在
// 检测 readyState 是否为 3， 就可以理由xhr实现http流。

function createStreamingClient(url, progress, finished) {
  var xhr = new XMLHttpRequest();
  var received = 0;
  xhr.open('get', url, true);
  xhr.onreadystatechange = function(){
    var result;
    if (xhr.readyState == 3) {
      result = xhr.responseText.substring(received);
      received += result.length;
      progress(result);
    }
  }
  xhr.send(null);
  return xhr;             //返回这个什么意思？
}
var client = createStreamingClient("string.php", function(data) {
  alert("received: " + data);
},function(data) {
  console.log('done');
})


// 服务器发送事件
// SSE API
var source = new EventSource("myevent.php");    // 传入的url与页面需要同源
// 也有两个 readyState
1             // 打开连接
2             // 关闭连接
// 还有三个事件：
open          // 建立连接的时候触发
message       // 在服务器接收到新事物的时候触发
error         // 无法建立连接的时候触发
source.onmessage = function(event) {
  var data = event.data;
}
// 服务器返回的数据存在 event.data 中
// eventSource 即使断开了也会连接
// 如果想强制关闭连接
source.close();

// 服务器事件，通过一个持久的HTTP响应发送， 这个响应的 MIME 类型（描述消息内容类型的因特网标准）text/event-stream
// 响应的各式是纯文本，最简单的情况是每个数据前面带有前缀 data:
data: foo         第一个message event.data ：foo

data: bar         第二个message event.data ： bar\foo
data: foo
// 有换行才会触发 message事件～
也可以给data添加 id,前后都可以
data: foo
id: 1
// Last-event-ID来查询上次断开的位置


// Web Sockets
// 要专门的服务器
ws://
wss://
// 创建一个socket
var socket = new WebSocket("ws://www.example.com/server.php");    //必须绝对url，同源策略不适用
// 也有表示当前 readyState 的属性
WebSocket.OPENING(0):  正在建立连接
WebSocket.OPEN(1):  已经建立连接
WebSocket.CLOSing(2):  正在关闭连接
WebSocket.CLOSE(3):  已经关闭连接
// 没有 onreadystatechange 事件
// 跳过吧，用到再说 ！！！！！！！！！！！！！！
