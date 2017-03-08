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

## 从输入url到渲染的整个过程

- 输入地址
- 浏览器查找域名的 IP 地址
- 这一步包括 DNS 具体的查找过程，包括：浏览器缓存->系统缓存->路由器缓存...
- 浏览器向 web 服务器发送一个 HTTP 请求
- 服务器的永久重定向响应（从 http://example.com 到 http://www.example.com）
- 浏览器跟踪重定向地址
- 服务器处理请求
- 服务器返回一个 HTTP 响应
- 浏览器显示 HTML
- 浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）
- 浏览器发送异步请求

需要考虑的事情还有很多，比如广播、拆包解包合并包丢包重传、路由表，NAT、TCP 状态机、CDN、HTTPS 证书校验与中间人攻击检测、RSA 密钥协商、AES 加解密、浏览器解析 HTTP 的有限自动状态机、GUI 库与绘图、OpenGL 绘图、GPU 加速（OpenCL 与 CUDA）、JIT（JavaScript 会把 JavaScript 代码编译成汇编代码）、服务器的数据库 NoSQL 或 SQL 查询、主从数据库同步、服务器和浏览器的内存管理（WebKit 实现的 fastMalloc()，服务器上可能是 TCMalloc 或者 JeMalloc）、服务器上的语言解释器（可能也是 JIT）、多媒体：傅里叶变换、H.264 解码（硬件解码，硬件解码的话 GPU 的处理单元又在计算.......或软件解码）、音频解码、WebGL 绘图、浏览器的 Sandbox、服务器的 SQL 注入检查、产生的键盘中断信号处理（或者是高级层面的输入输出驱动）、网卡驱动、网络栈的 TCP FastOpen、SYN Cookie 之类的技术

https://segmentfault.com/q/1010000000489803

## 三次握手

首先Client端发送连接请求报文，Server段接受连接后回复ACK报文，并为这次连接分配资源。Client端接收到ACK报文后也向Server段发生ACK报文，并分配资源，这样TCP连接就建立了。


## 关闭的时候却是四次握手
【注意】中断连接端可以是Client端，也可以是Server端。
```
假设Client端发起中断连接请求，也就是发送FIN报文。Server端接到FIN报文后，意思是说"我Client端没有数据要发给你了"，但是如果你还有数据没有发送完成，则不必急着关闭Socket，可以继续发送数据。所以你先发送ACK，"告诉Client端，你的请求我收到了，但是我还没准备好，请继续你等我的消息"。这个时候Client端就进入 FIN_WAIT 状态，继续等待Server端的FIN报文。当Server端确定数据已发送完成，则向Client端发送FIN报文，"告诉Client端，好了，我这边数据发完了，准备好关闭连接了"。Client端收到FIN报文后，"就知道可以关闭连接了，但是他还是不相信网络，怕Server端不知道要关闭，所以发送ACK后进入 TIME_WAIT 状态，如果Server端没有收到ACK则可以重传。“，Server端收到ACK后，"就知道可以断开连接了"。Client端等待了2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，我Client端也可以关闭连接了。Ok，TCP连接就这样关闭了！
```

http://blog.csdn.net/whuslei/article/details/6667471/

## 跨域

这里说的js跨域是指通过js在不同的域之间进行数据传输或通信，比如用ajax向一个不同的域请求数据，或者通过js获取页面中不同域的框架中(iframe)的数据。只要协议、域名、端口有任何一个不同，都被当作是不同的域。

- 通过jsonp跨域
- 通过修改document.domain来跨子域：只能往更高一级
- 使用window.name来进行跨域
- window.postMessage方法来跨域传送数据



http://www.cnblogs.com/2050/p/3191744.html

## 懒加载和预加载

#### 什么是懒加载？

懒加载也就是延迟加载。
当访问一个页面的时候，先把img元素或是其他元素的背景图片路径替换成一张大小为1*1px图片的路径（这样就只需请求一次，俗称占位图），只有当图片出现在浏览器的可视区域内时，才设置图片正真的路径，让图片显示出来。这就是图片懒加载。

懒加载的实现步骤？

1) 首先，不要将图片地址放到src属性中，而是放到其它属性(data-original)中。
2) 页面加载完成后，根据scrollTop判断图片是否在用户的视野内，如果在，则将data-original属性中的值取出存放到src属性中。
3) 在滚动事件中重复判断图片是否进入视野，如果进入，则将data-original属性中的值取出存放到src属性中。

http://www.jianshu.com/p/4876a4fe7731

页面加载速度快、可以减轻服务器的压力、节约了流量,用户体验好

#### 什么是预加载？

提前加载图片，当用户需要查看时可直接从本地缓存中渲染

实现预加载的方法有哪些？

- 用CSS和JavaScript实现预加载
- 仅使用JavaScript实现预加载
- 使用Ajax实现预加载
[具体这里](http://web.jobbole.com/86785/)

## em/rem  区别

em：所有现代浏览器下默认字体尺寸是16px，这时1em=16px。然后你人为的把body里面定义font-size:12px;（把浏览器默认16px改小了），此刻1em=12px，如果0.8em实际等于12px*0.8；em的用处是你要整个网页字体统一变大变小你只要改body里面font-size的值就行了。

另外：em会继承父元素的字体大小

如果是块状元素，自身也应该是有默认尺寸的。比如浏览器如果默认的1em是16px，参照下面的表格：
h1 { font-size: 2em; margin: .67em 0 } 对应32px
h2 { font-size: 1.5em; margin: .75em 0 } 对应24px
h3 { font-size: 1.17em; margin: .83em 0 }
h4, p, blockquote, ul, fieldset, form, ol, dl, dir, menu { margin: 1.12em 0 }
h5 { font-size: .83em; margin: 1.5em 0 }
h6 { font-size: .75em; margin: 1.67em 0 }


Rem，上面你看到了，em相对父级，嵌套一多了算字体到底多大就很操蛋，所以有了Rem(浏览器支持还不是很理想)，他只相对html或body的字体尺寸(默认还是16px，除非你自己用font-size定义为其他)，没有了继承父级尺寸这个关系。 

## BFC

BFC 已经是一个耳听熟闻的词语了，网上有许多关于 BFC 的文章，介绍了如何触发 BFC 以及 BFC 的一些用处（如清浮动，防止 margin 重叠等）。虽然我知道如何利用 BFC 解决这些问题，但当别人问我 BFC 是什么，我还是不能很有底气地解释清楚。于是这两天仔细阅读了CSS2.1 spec 和许多文章来全面地理解BFC。

*BFC是什么？*

在解释 BFC 是什么之前，需要先介绍 Box、Formatting Context的概念。

Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：

- block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
- inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
- run-in box: css3 中才有， 这儿先不讲了。

#### Formatting context

　Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

CSS2.1 中只有 BFC 和 IFC, CSS3 中还增加了 GFC 和 FFC。

#### BFC 定义

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

#### BFC布局规则：
- 内部的Box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算 

*哪些元素会生成BFC?*

- 根元素
- float属性不为none
- position为absolute或fixed
- display为inline-block, table-cell, table-caption, flex, inline-flex
- overflow不为visible

*BFC的作用及原理*

- 自适应两栏布局
- 清除内部浮动
- 防止垂直 margin 重叠

其实以上的几个例子都体现了BFC布局规则第五条：

```
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
```


## bootstrap是怎么实现grid系统的

http://www.jb51.net/article/93910.htm

## XSS攻击及防御

转义，预防xss攻击

http://blog.csdn.net/ghsau/article/details/17027893

## CSRF的攻击与防御

http://www.h3c.com.cn/About_H3C/Company_Publication/IP_Lh/2012/04/Home/Catalog/201208/751467_30008_0.htm

## 有趣的知识
document.defaultView === window
当前页面的前一个关联页面 document.referrer














