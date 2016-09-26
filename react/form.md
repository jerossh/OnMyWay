# 表单组件

### 交互属性
- value，用于 &lt;input>、&lt;textarea> 组件。
- checked，用于类型为 checkbox 或者 radio 的 &lt;input> 组件。
- selected，用于 &lt;option> 组件。

在 HTML 中，&lt;textarea> 的值通过子节点设置；在 React 中则应该使用 value 代替。

onChange 执行并通过浏览器做出响应：

- &lt;input> 或 &lt;textarea> 的 value 发生变化时。
- &lt;input> 的 checked 状态改变时。
- &lt;option> 的 selected 状态改变时。

和所有 DOM 事件一样，所有的 HTML 原生组件都支持 onChange 属性，而且可以用来监听冒泡的 change 事件。

### 受限组件

设置了 value 的 &lt;input> 是一个受限组件。 对于受限的 &lt;input>，渲染出来的 HTML 元素始终保持 value 属性的值。例如：

```js
render: function() {
   return <input type="text" value="Hello!" />;
  }
```

### 不受限组件

```js
render: function() {
  return <input type="text" defaultValue="Hello!" />;
}
```

### 为什么使用受限组件？

在 React 中使用诸如 &lt;input> 的表单组件时，遇到了一个在传统 HTML 中没有的挑战。
比如下面的代码：

```js
<input type="text" name="title" value="Untitled" />
```

在 HTML 中将渲染初始值为 Untitled 的输入框。用户改变输入框的值时，节点的 value 属性（property）将随之变化，但是 node.getAttribute('value') 还是会返回初始设置的值 Untitled.

与 HTML 不同，React 组件必须在任何时间点描绘视图的状态，而不仅仅是在初始化时。比如在 React 中：

```js
render: function() {
    return <input type="text" name="title" value="Untitled" />;
  }
```

方法在任何时间点渲染组件以后，输入框的值就应该始终为 Untitled。

### 为什么 &lt;textarea> 使用 value 属性？

对 HTML 而言，让开发者设置多行的值很容易。但是，React 是 JavaScript，没有字符限制，可以使用 \n 实现换行。简言之，React 已经有 value、defaultValue 属性，&lt;/textarea> 组件的子节点扮演什么角色就有点模棱两可了。基于此， 设置 &lt;textarea> 值时不应该使用子节点：

```js
 <textarea name="description" value="This is a description." />
```

### 为什么 &lt;select> 使用 value 属性

HTML 中 &lt;select> 通常使用 &lt;option> 的 selected 属性设置选中状态；React 为了更方面的控制组件，采用以下方式代替：

```js
<select value="B">
  <option value="A">Apple</option>
  <option value="B">Banana</option>
  <option value="C">Cranberry</option>
</select>
```
