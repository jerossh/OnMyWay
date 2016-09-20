# HTML 5 Web 存储

HTML5 提供了两种在客户端存储数据的新方法：

- localStorage - 没有时间限制的数据存储
- sessionStorage - 针对一个 session 的数据存储

之前，这些都是由 cookie 完成的。但是 cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢而且效率也不高。

### localStorage

如何创建和访问 localStorage：

```js
localStorage.lastname="Smith";
document.write(localStorage.lastname);
```

下面的例子对用户访问页面的次数进行计数：

```js
if (localStorage.pagecount){
  localStorage.pagecount = Number (localStorage.pagecount) + 1;
}
else{
  localStorage.pagecount = 1;
}
document.write("Visits "+ localStorage.pagecount + " time(s).");
```





### sessionStorage
sessionStorage 方法针对一个 session 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。

如何创建并访问一个 sessionStorage：

```js
sessionStorage.lastname="Smith";
document.write(sessionStorage.lastname);
```

下面的例子对用户在当前 session 中访问页面的次数进行计数

```js
if (sessionStorage.pagecount) {
  sessionStorage.pagecount = Number(sessionStorage.pagecount) + 1;
} else {
  sessionStorage.pagecount = 1;
}
document.write("Visits " + sessionStorage.pagecount + " time(s) this session.");
```

### 操作方法
localStorage和sessionStorage都具有相同的操作方法，例如setItem、getItem和removeItem等

1. setItem存储value

```js
sessionStorage.setItem("key", "value");
localStorage.setItem("site", "js8.in");
```

2. getItem获取value
```js
var value = sessionStorage.getItem("key");
var site = localStorage.getItem("site");
```

3. removeItem删除key

```js
sessionStorage.removeItem("key");
localStorage.removeItem("site");
```

4. clear清除所有的key/value

```js
sessionStorage.clear();
localStorage.clear();
```

### 其他操作方法
web Storage不但可以用自身的setItem,getItem等方便存取，也可以像普通对象一样用点(.)操作符，及[]的方式进行数据存储，像如下的代


```js
var storage = window.localStorage; storage.key1 = "hello";
storage["key2"] = "world";
console.log(storage.key1);
console.log(storage["key2"]);
```

### localStorage和sessionStorage的key和length属性实现遍历
sessionStorage和localStorage提供的key()和length可以方便的实现存储的数据遍历，例如下面的代码

```js
var storage = window.localStorage;
for (var i=0, len = storage.length; i < len; i++)
{
var key = storage.key(i);
var value = storage.getItem(key);
console.log(key + "=" + value);
}
```

### storage事件
storage还提供了storage事件，当键值改变或者clear的时候，就可以触发storage事件，如下面的代码就添加了一个storage事件改变的监听：

```js
if(window.addEventListener){
window.addEventListener("storage",handle_storage,false);
}
else if(window.attachEvent)
{
window.attachEvent("onstorage",handle_storage);
}
function handle_storage(e){
if(!e){e=window.event;}
}
```

### 应用- 数据存储

```js
// 写入
var arrDispaly = [0, 1, 1, 1];
if (window.localStorage) {
  localStorage.setItem('menuTitle', arrDispaly);
} else {
  cookie.write('menuTitle', arrDispaly);
}

// 读取
var strStoreDate = window.localStorage? localStorage.getItem('menuTitle') : Cookie.read('menuTitle');   // "0,1,1,1"
// 虽然存入的是数组，但是存入都是字符串(Cookie和localStorage都是)
strStoreDate.split(',').each(function(display, index) {
  //
});
