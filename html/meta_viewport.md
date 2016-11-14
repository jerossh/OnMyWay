# viewport的概念(视口)
通俗的讲，移动设备上的viewport就是设备的屏幕上能用来显示我们的网页的那一块区域

## css中的1px并不等于设备的1px
 在css中我们一般使用px作为单位，在桌面浏览器中css的1个像素往往都是对应着电脑屏幕的1个物理像素，这可能会造成我们的一个错觉，那就是css中的像素就是设备的物理像素。但实际情况却并非如此，css中的像素只是一个抽象的单位，在不同的设备或不同的环境中，css中的1px所代表的设备物理像素是不同的。

在移动端浏览器中以及某些桌面浏览器中，window对象有一个devicePixelRatio属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是

```
devicePixelRatio = 物理像素 / 独立像素。
```

layout viewport:(如早期苹果设置为 980px容纳整个网页)
```js
document.documentElement.clientWidth    // 435
```

visual viewport:（真实的网页大小，手机只能显示左边部分，超出部分要手指向右滑动）
```js
window.innerWidth   // 435
```

deal viewport:(为了看清楚文字而设置的 iphone 一般 320px)

## 利用meta标签对viewport进行控制

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

width:	             设置layout viewport  的宽度，为一个正整数，或字符串"width-device"
initial-scale:       设置页面的初始缩放值，为一个数字，可以带小数
minimum-scale:	     允许用户的最小缩放值，为一个数字，可以带小数
maximum-scale:	     允许用户的最大缩放值，为一个数字，可以带小数
height:	             设置layout viewport  的高度，这个属性对我们并不重要，很少使用
user-scalable:       是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许
target-densitydpi    值可以为一个数值或 high-dpi 、 medium-dpi、 low-dpi、 device-dpi 这几个字符串中的一个（据说已废弃）


## 把当前的viewport宽度设置为 ideal viewport 的宽度

```html
<meta name="viewport" content="width=device-width">
```

当width和 initial-scale不一致，取高的那个值

```html
<meta name="viewport" content="width=400, initial-scale=1">  
```

## 关于meta viewport的更多知识

#### 关于缩放以及initial-scale的默认值
- 在iphone中，ideal viewport的宽度是320px，如果我们设置 initial-scale=2 ，此时viewport的宽度会变为只有160px了

- 如果没有设置initial-scale, iphone和ipad会自动计算initial-scale这个值，以保证当前layout viewport的宽度在缩放后就是浏览器可视区域的宽度，也就是说不会出现横向滚动条

## 通用模板

```html
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
```
