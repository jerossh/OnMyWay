
## defer async 的区别


- 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
- sync,
有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。
- defer,
有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。

然后从实用角度来说呢，首先把所有脚本都丢到 </body> 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析。

图例子
[!src](http://segmentfault.com/img/bVcQV0)

1. defer 和 async 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
- 它俩的差别在于脚本下载完之后何时执行，显然 defer 是最接近我们对于应用脚本加载和执行的要求的
- 关于 defer，此图未尽之处在于它是按照加载顺序执行脚本的，这一点要善加利用
- async 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
- 仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被- 任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics


## css 脚本的解析

- css （不管内敛还是外链）会阻塞 DOM的渲染，但 DOM 的解析会正常进行
- 很多浏览器中，CSS会延迟脚本执行和 DOMContentLoaded 事件
- JS（外链或内联）会阻塞 后续 DOM的解析（Parsing），后续DOM的渲染（Rendering）也将被阻塞
- JS前的DOM可以正常解析（Parsing）和渲染（Rendering）

#### CSS阻塞DOM渲染
无论是外链CSS还是内联CSS都会阻塞DOM渲染（Rendering），然而DOM解析（Parsing）会正常进行。 这意味着在CSS下载并解析结束之前，它后面的HTML都不会显示。 这也是为什么我们把样式放在HTML内容之前，以防止被呈现内容发生样式跳动。 当然代价就是显示延迟，所以性能攸关的站点都会内联所有CSS。

有些情况下，可以尝试添加媒体查询来避免不必要的阻塞。 尤其是响应式站点可以做此优化：

```css
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
```

## 事件DOMContentLoaded和load的区别

他们的区别是，触发的时机不一样，先触发DOMContentLoaded事件，后触发load事件。

DOM文档加载的步骤为
- 解析HTML结构。
- 加载外部脚本和样式表文件。
- 解析并执行脚本代码。
- DOM树构建完成。//DOMContentLoaded
- 加载图片等外部文件。
- 页面加载完毕。//load

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

如果多页面使用，则可以缓存到 css 中。
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


 
