## :root 选择器
:root 选择器匹配文档根元素。
在 HTML 中，根元素始终是 html 元素。


## 需要熟悉的选择器
```
element+element
[attribute~=value]
[attribute|=value]

:link
:visited
:active

:only-of-type
:only-child
:nth-of-type(n)

:empty              p:empty	         选择没有子元素的每个 <p> 元素（包括文本节点）。
:target	            #news:target	   选择当前活动的 #news 元素。
:enabled	          input:enabled	   选择每个启用的 <input> 元素。
:disabled	          input:disabled	 选择每个禁用的 <input> 元素
:checked	          input:checked	   选择每个被选中的 <input> 元素。
:not(selector)      not(p)	         选择非 <p> 元素的每个元素。
::selection         ::selection	     选择被用户选取的元素部分。
```


## background-origin 属性

background-origin 属性规定背景图片的定位区域。
背景图片可以放置于 content-box、padding-box 或 border-box 区域。

![background-origin](http://www.w3school.com.cn/i/background-origin.gif)


## background-clip 属性

```css
div
{
background-color:yellow;
background-clip:content-box;
}
```


## 多重背景图片
为 body 元素设置两幅背景图片：
```css
body
{
background-image:url(bg_flower.gif),url(bg_flower_2.gif);
}
```

## word-break

word-break

## 2D 转换

transform-origin 属性
```
translate()
rotate()
scale()
skew()
matrix()      matrix() 方法需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。
```

## 过渡
```
transition	                   简写属性，用于在一个属性中设置四个过渡属性。
transition-property	           规定应用过渡的 CSS 属性的名称。
transition-duration	           定义过渡效果花费的时间。默认是 0。
transition-timing-function	   规定过渡效果的时间曲线。默认是 "ease"。
transition-delay	             规定过渡效果何时开始。默认是 0。
```

## 动画 @keyframes 规则

```css
@keyframes myfirst
{
from {background: red;}
to {background: yellow;}
}
div
{
animation: myfirst 5s;
}

/* 其他 */
@keyframes myfirst
{
0%   {background: red;}
25%  {background: yellow;}
50%  {background: blue;}
100% {background: green;}
}
```

## 动画属性
```
@keyframes	                    规定动画。
animation	                      所有动画属性的简写属性，除了 animation-play-state 属性。
animation-name	                规定 @keyframes 动画的名称。
animation-duration	            规定动画完成一个周期所花费的秒或毫秒。默认是 0。
animation-timing-function	      规定动画的速度曲线。默认是 "ease"。
animation-delay	                规定动画何时开始。默认是 0。
animation-iteration-count	      规定动画被播放的次数。默认是 1。
animation-direction	            规定动画是否在下一周期逆向地播放。默认是 "normal"。
animation-play-state	          规定动画是否正在运行或暂停。默认是 "running"。
animation-fill-mode	            规定对象动画时间之外的状态。
```

## 多列
- column-count
- column-gap
- column-rule

## CSS3 用户界面

- resize
- box-sizing
- outline-offset
