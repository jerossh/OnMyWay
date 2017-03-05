## 非重复图片使用 data url

大多数的浏览器都有一个并发请求数不能超过4个的限制，所以图片使用 data url 的形式可以减少 单独的图片请求。

而使用Data URL技术，图片数据以base64字符串格式嵌入到了页面中，与HTML成为一体，它的形式如下：

```html
 <img src="data:image/gif;base64,R0lGODlhMwAxAIAAAAAAAP///
yH5BAAAAAAALAAAAAAzADEAAAK8jI+pBr0PowytzotTtbm/DTqQ6C3hGX
ElcraA9jIr66ozVpM3nseUvYP1UEHF0FUUHkNJxhLZfEJNvol06tzwrgd
LbXsFZYmSMPnHLB+zNJFbq15+SOf50+6rG7lKOjwV1ibGdhHYRVYVJ9Wn
k2HWtLdIWMSH9lfyODZoZTb4xdnpxQSEF9oyOWIqp6gaI9pI1Qo7BijbF
ZkoaAtEeiiLeKn72xM7vMZofJy8zJys2UxsCT3kO229LH1tXAAAOw==">
```

几乎所有的现代浏览器都支持Data URL格式，包括火狐浏览器，谷歌浏览器，Safari浏览器，opera浏览器。IE8也支持，但有部分限制，IE9完全支持。

####优点
- 当访问外部资源很麻烦或受限时
- 当图片是在服务器端用程序动态生成，每个访问用户显示的都不同时。
- 当图片的体积太小，占用一个HTTP会话不是很值得时。
#### 缺点
- Base64编码的数据体积通常是原数据的体积4/3，也就是Data URL形式的图片会比二进制格式的图片体积大1/3。
- Data URL形式的图片不会被浏览器缓存，这意味着每次访问这样页面时都被下载一次。这是一个使用效率方面的问题——尤其当这个图片被整个网站大量使用的时候。- 

#### 在CSS里使用Data URL

如何能将Data URL数据也放入浏览器缓存中呢？

通过CSS样式文件。CSS中的url操作符是用来指定网页元素的背景图片的，而浏览器并不在意URL里写的是什么——只要能通过它获取需要的数据。所以，我们就有了可以将Data URL形式的图片存储在CSS样式表中的可能。而所有浏览器都会积极的缓存CSS文件来提高页面加载效率。

小案例
```css 
.striped_box
  {
  width: 100px;
  height: 100px;
  background-image: url("data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7");
  border: 1px solid gray;
  padding: 10px;
  }
```
```html
<div class="striped_box">
这是一个有条纹的方块
</div>
 ``` 

 在这个例子中，Data URL的使用是完全符合场景的。它避免了让这个小小的背景图片独自产生一次HTTP请求，而且，这个小图片还能同CSS文件一起被浏览器缓存起来，重复使用，不会每次使用时都加载一次。只要这个图片不是很大，而且不是在CSS文件里反复使用，就可以以Data URL方法呈现图片降低页面的加载时间，改善用户的浏览体验。

 #### 工具

 [Data-URL-Toolkit](https://github.com/sveinbjornt/Data-URL-Toolkit)
