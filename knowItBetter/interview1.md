## 如何提高 css 开发效率和规范
1. 使用预处理器 less、 sass、stylus
2. 使用 css 框架，如 pure.css、Fitgrd : Responsive Grid System，可以参考 [这里](http://www.open-open.com/news/view/1de4b9d/)
3. 如果不适用 框架，则可以 自己定义 reset.css， 以重置各个浏览器的差异和一些浏览器的自定义UI


## 常见请求异常状态码

HTTP请求错误400、401、402、403、404、405、406、407、412、414、500、501、502

- 1xx（临时响应）表示临时响应并需要请求者继续执行操作的状态代码
- 100：（继续） 请求者应当继续提出请求。 服务器返回此代码表示已收到请求的第一部分，正在等待其余部分。  
- 101：（切换协议） 请求者已要求服务器切换协议，服务器已确认并准备切换。

- 2xx （成功）
- 200：（成功）  服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。 
- 201：（已创建）  请求成功并且服务器创建了新的资源。 
- 202：（已接受）  服务器已接受请求，但尚未处理。 
- 203：（非授权信息）  服务器已成功处理了请求，但返回的信息可能来自另一来源。 
- 204：（无内容）  服务器成功处理了请求，但没有返回任何内容。 
- 205：（重置内容） 服务器成功处理了请求，但没有返回任何内容。 
- 206：（部分内容）  服务器成功处理了部分 GET 请求。

- 3xx （重定向） 表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。
- 300：（多种选择）  针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。 
- 301：（永久移动）  请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。 
- 302：（临时移动）  服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。 
- 303：（查看其他位置） 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。 
- 304：（未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。 
- 305：（使用代理） 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。 
- 307：（临时重定向）  服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请


- 4xx（请求错误） 这些状态代码表示请求可能出错，妨碍了服务器的处理。
- 400：请求出错，由于语法格式有误，服务器无法理解此请求。不作修改，客户程序就无法重复此请求。 
- 401：未授权 
- 403：禁止访问
- 404：找不到该资源
- 405：此方法不被允许
- 406：不可接受（MIME、字符集、编码、语言、接受范围）
- 407：需要代理身份验证
- 412：先决条件失败（无法理解）
- 414：Request-URI 太长

- 500：服务器的内部错误，Web 服务器不能执行此请求。请稍后重试此请求。 
- 501：未实现，Web 服务器不支持实现此请求所需的功能。请检查URL 中的错误
- 502：网关出错，当用作网关或代理时，服务器将从试图实现此请求时所访问的 [upstream](http://tengine.taobao.org/book/chapter_05.html) 服务器中接收无效的响应。


## apply、call、bind

- call： 第一个参数是 绑定的 this， 之后都是参数；应用call的函数立即执行。返回值：返回结果包括指定的this值和参数。
- apply：更像 call 语法糖，两个参数。参数一是 绑定的 this， 第二是参数数组
- bind： bind()方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的 this, 之后的一序列参数将会在传递的实参前传入作为它的参数。这种行为就像把原函数当成构造器。
[更多理解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- bind 的 polyfill
```js
if (!Function.prototype.bind) {
     Function.prototype.bind = function (oThis) {
         if (typeof Function !== 'function') {
             // 如果无法写入，则抛出错误
             throw new TypeError("Function.prototype.bind - what is trying to bound is not callable")
         }

         var aArgs = Array.prototype.slice.call(arguments, 1),  // 截取第一个参数
             fToBind = this,  // 用于 fbound 函数内
             fNOP = function () {},
             fBound = function () {
                 return fToBind.apply(this instanceof fNOP?this:oThis || this,
                 aArgs.contat(Array.prototype.slice.call(arguments)));
             };
         fNOP.prototype = this.prototype;
         fBound.prototype = new fNOP();    

         return fBound;
     }
}
```

## 计算最终样式

可以使用 window.getComputedStyle('元素', '伪类')，或 ie 的 ele.currentStyle
```js
var dom = document.querySelector('#adZhuFengFloat');
var getStyle = window.getComputedStyle || document.defaultView.getComputedStyle;  // 后面兼容 老版本 ff
getStyle(dom)['float']  //  也可以使用 getPropertyValue 方法， IE getAttribute 驼峰写法
```

## 盒模型
ie的 width 包含了 padding，border

## flex
- flex-direction
- flex-wrap 是否换行
- flex-flow： direction和wrap 的简写
- justify-content
- align-items
- align-content 

项目属性：
- order
- flex-grow
- flex-shrink
- flex-basis
- flex: flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
- align-self, 覆盖 父属性的 align-items, 可以单个不对齐

## prototype 与 __proto__

__proto__ 是原型,prototype是函数默认的一个属性,它指向一个对象,这个对象的constructor属性指向函数本身.

## new到底发生了什么

function A () {}

var o = new Object();
o. __proto__ = A.prototype;//这里还记得之那个function里面的默认的属性么?
A.call(o)//由于这里this是指向o,可以把什么this.name/getName绑定到o上.
把这个o返回给a;//完成var a = new A()的过程.

这里注意下,上面所谓的第4步其实是一个简化的说法.真正的过程是在第3步之后,如果发现A返回是一个Object类型(非primitive类型,即非string,boolean,number,null,undefined类型就是Object类型),则直接返回A的返回值,否则把第1步new的Object返回出去.(默认情况下,JS中函数默认返回值是undefined)举个例子

```js
function A(name){
	this.name = name;
	this.getName = function(){
		console.log(this.name);
	}

	var b = 'test';
	console.log(b);

	return {};
}

var a = new A('testa');//{}
```

这里我们把A函数的返回值设置为一个Object类型,则这个时候执行new A返回的就是A函数的返回值{}.如果我们把A的返回值设置为return [];那么我们在new A的时候也相应的得到一个空数组.

用 stackoverflow 上一个人的回答来总结下就是:

In JavaScript, most functions are both callable and instantiable: they have both a [[Call]] and [[Construct]] internal methods.

在JS中,绝大多数的函数都是既可以调用也可以实例化的.我们既可以直接执行函数得到函数的返回值.也可以通过new操作符得到一个对象.



## this的理解

this是Javascript语言的一个关键字它代表函数运行时，自动生成的一个内部对象，只能在函数内部使用,下面分四种情况，详细讨论this的用法，感兴趣的朋友可以了解下
一般存在四种状态
1. 纯函数，纯函数调用，直接指向 window
2. 对象方法，指向该对象
3. 构造函数，new 生成一个新对象， this 指向这个新对象
4. call, apply 调用，指向调用的第一个参数
















