## 数据绑定形式

在应用固定的时候，数据有两种绑定形式；

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
})
```


```html
<!-- 第一种形式 -->
<div id="app">
  {{ message }}
</div>

<!-- 第二种形式 -->
<div id="app-2">
  <!-- 这个针对 attr ？ -->
  <span v-bind:title="message">
    Hover your mouse over me for a few seconds to see my dynamically bound title!
  </span>
</div>
```

更新数据的时候，可以 省略 data

```js
// 注意，中间没有 data
app2.message = 'some new message'
```

## 条件、循环

使用  v-if 来控制条件

```html
<div id="app-3">
  <p v-if="seen">Now you see me</p>
</div>
```

```js
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true   // 默认显示
  }
})

// 设置隐藏
app3.seen = false   // 难道 seen 是默认控制显隐的？
```

v-for 指令可以绑定数据到数据来渲染一个列表：

```html
<div id="app-4">
  <ol>
    <!-- v-for 内 string 就形成一个循环 -->
    <li v-for="todo in todos">
      <!-- todo是 v-for 循环的子项目结果 -->
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```js
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})

// 添加一条，注意省略 data
app4.todos.push({ text: 'New item' })
```

## 处理用户输入

用 v-on 指令绑定一个监听事件用于调用我们 Vue 实例中定义的方法：

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```js
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

在 *reverseMessage* 方法中，我们在没有接触 DOM 的情况下更新了应用的状态 - 所有的 DOM 操作都由 Vue 来处理，你写的代码只需要关注基本逻辑。

v-model 指令，它使得在表单输入和应用状态中做双向数据绑定变得非常轻巧。

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```js
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

## 组件构建(应用)

组件树：

[!组件树](http://cn.vuejs.org/images/components.png)

预定义选项的一个 Vue 实例：

```js
// Define a new component called todo-item
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})
```

现在你可以另一个组件模板中写入它：
``` html
<ul>
  <!-- Create an instance of the todo-item component -->
  <todo-item></todo-item>
</ul>
```

prop 字段

```js
Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
```
这样就可以重复利用v-bind 重复利用这个组件

```html
<div id="app-7">
  <ol>
    <!-- Now we provide each todo-item with the todo object    -->
    <!-- it's representing, so that its content can be dynamic -->
     <!-- v-bind: 的用处还是不甚了解 -->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>
```

```js
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: 'Vegetables' },
      { text: 'Cheese' },
      { text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
```
