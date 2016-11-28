// 检测是否离线
navigator.onLine   // 属性，布尔值
// 两个事件 online, offline
window.addEventListener('offline', function(){
  console.log('You are offline');
}, false);
window.addEventListener('online', function(){
  console.log('You are online');
}, false);
// 页面加载后，首先用 navigator.onLine，查询是否处于离线，然后在用 online， offline 来检测变化

// 应用缓存, appcache
// 使用一个 manifest file，列出要下载和缓存的资源
CACHE MANIFEST
#comment

file.js
file.css
// <html manifest="/offline.manifest">
// 文件的 MIME 类型 text/cache-appche
// 离线缓存的API 核心 applicationCache 对象
// 也有一个 status 属性
0              // 无缓存，即没有与页面有关的缓存
1              // 闲置，即应用缓存未得到更新
2              // 检查中，即正在下载描述文件并检查更新
3              // 下载中，即应用缓存正在下载描述文件中的特定资源
4              // 更新完成，即应用缓存已经更新了资源，可以通过 swapCache() 来使用
5              // 废弃。应用缓存已经不存在了
// 还有很多事件
checking
error
noupdate
downloading
progress
updateready               // 可以触发 swapCache()
cached
// 一般都是上面的步骤，也可以手工干预
applicationCache.update();             // applicationCache 对象的 强制更新方法
// 可以这样调用
window.addEventListener('updateready', function(){
  applicationCache.update();
}, false);



// 数据存储
// HTTP cookie 通常叫做 cookie
// 服务器会对 HTTP 请求 发送 Set-Cookie HTTP 头座位响应的一部分， 例如
HTTP/1.1 200 OK
Conent-type: text/html
Set-Cookie: name-value
other-header: ohter-header-value
// 浏览器存储这样的信息，请求的时候返回如下
GET /index.html HTTP/1.1
Cookie: name/value
other-header: ohter-header-value
// 发回服务用于验证了来自哪个客户
//  限制
// cookie 信息量很小
// cookie的构成:1 名称， 2 值，3 域，4 路径， 5 失效事件 6， 安全标志
// js的 cookie
document.cookie
name=value;expirs=expiration_time;path=path_path;
// cookie 的内容都是经过 encodeURIComponent 编码过的
// 所以设置 cookie ，要这样子
document.cookie = encodeURIComponent('name') + '=' + encodeURIComponent('value') + ';domain=.wraox.com; path=/';
// cookie操作一般就读取，写入，删除。然后就写一个 function
var cookieUtil = {            详见 p631
  get:function() {},
  set:function() {},
  delete: function() {}
};

// 子 cookie：为了绕过 cookie的个数限制
// 又有一个子 cookie 的操作
var SubCookieUtil = {
  get: function(){},
  getAll:function(){},
  set:function() {},
  setAll:function(){},
  unset:function() {},
  unsetAll: function(){}
}



// Web 存储机制
