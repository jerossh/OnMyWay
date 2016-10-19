以前大家都使用 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 来实现这种功能。Fetch 提供了一种简单的替代方案，同时它也能被其他接口（比如 Service Workers）使用，另外，定义其他和 HTTP 有关的概念（比如 CORS 和其他 HTTP 扩展）也更方便。

如果你现在就想使用它，还可以用 [Fetch Polyfil](https://github.com/github/fetch)，用于支持那些还未支持 Fetch 的浏览器。记住它目前还支持在实验阶段。

## 发起 fetch 请求

```js
var myImage = document.querySelector('img');

fetch('flowers.jpg')
.then(function(response) {
  return response.blob();
})
.then(function(myBlob) {
  // URL.createObjectURL 这也是新的知识点
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```

以上代码中，我们通过网络获取了一个图片，然后将它插入到一个 <img> 标签中。这个最简单的用法中，fetch() 接受了一个参数——请求的地址——然后返回一个包含 response（一个 Response 对象）的 promise 对象。

当然它只是一个 HTTP 响应，而不是真的图片。为了获取图片的内容，我们需要使用 **blob()** 方法

### 自定义请求的参数

fetch() 接受第二个可选参数，一个可以控制不同配置的 init 对象：

```js
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

fetch('flowers.jpg',myInit)
.then(function(response) {
  return response.blob();
})
.then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```
