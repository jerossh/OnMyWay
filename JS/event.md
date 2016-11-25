现在还不是很熟悉的事件

## 事件句柄
- onabort：图像加载被中断
- onchange
- ondblclick
- onerror：当加载文档或图像时发生某个错误
- onload：某个页面或图像被完成加载
- onselect：文本被选定
- onunload：用户退出页面
其他的事件比较熟悉

## 鼠标 / 键盘属性
鼠标和键盘也有大量的属性

- altKey
- shiftKey
- ctrlKey
- button
- relatedTarget：  返回与事件的目标节点相关的节点。
- button :返回当事件被触发时，哪个鼠标按钮被点击。   event.button=0|1|2
其他的 clientX，screenX等比较熟悉

### IE 属性

- cancelBubble：相当于 stopProgation
- fromElement：对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素。
- offsetX,offsetY
- returnValue

# 标准 Event 属性

```js

```

事件中
event.target =
