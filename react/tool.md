
# 2. 插件

React.addons 是为了构建 React 应用而放置的一些有用工具的地方。此功能应当被视为实验性的，但最终将会被添加进核心代码中或者有用的工具库中：

- TransitionGroup和CSSTransitionGroup，用于处理动画和过渡，这些通常实现起来都不简单，例如在一个组件移除之前执行一段动画。
- LinkedStateMixin，用于简化用户表单输入数据和组件 state 之间的双向数据绑定。
- classSet，用于更加干净简洁地操作 DOM 中的 class 字符串。
- cloneWithProps，用于实现 React 组件浅复制，同时改变它们的 props 。
- update，一个辅助方法，使得在 JavaScript 中处理不可变数据更加容易。
- PureRednerMixin，在某些场景下的性能检测器。

以下插件只存在于 React 开发版（未压缩）：

- TestUtils， 简单的辅助工具，用于编写测试用例（仅存在于未压缩版）.
- Perf，用于性能测评，并帮助你检查出可优化的功能点。

要使用这些插件，需要用 react-with-addons.js （和它的最小化副本）替换常规的React.js。

当通过npm使用react包的时候，只要简单地用 require('react/addons') 替换 require('react') 来得到带有所有插件的React。

## 动画

#### 高级API：ReactCSSTransitionGroup


#### 底层的API：ReactTransitionGroup

ReactTransitionGroup是动画的基础。它可以通过React.addons.TransitionGroup得到。


## 双向绑定辅助工具

ReactLink是一种简单表达React双向绑定的方式。

```
注意：
如果你是这个框架的初学者，记住ReactLink对于大多数应用来说都是不需要的，应该谨慎使用。
```

## 类名操作

classSet()是一个简洁的工具，用于简单操作DOM中的class字符串。

## 测试工具集

React.addons.TestUtils使得在你选择的测试框架中测试React组件变得简单（我们使用Jest）

## 克隆组件

## 不可变数据的辅助工具

### 主要思想（The main idea）
update()在这种情形下提供了简单的语法糖，使得写这种代码变得更加简单。代码变为：
```js
var newData = React.addons.update(myData, {
  x: {y: {z: {$set: 7}}},
  a: {b: {$push: [9]}}
});
```
以$为前缀的键被称作命令。他们“改变”的数据结构被称为目标。(首 mongodb 查询更新启发)

### 可用的命令（Available commands）

- {$push: array} 利用push()把目标上所有的元素放进数组（push() all the items in array on the target.）。
- {$unshift: array} 利用unshift()把目标上所有的元素放进数组（unshift() all the items in array on the target.）。
- {$splice: array of arrays} 对于array中的每一个元素，用元素提供的参数在目标上调用splice()（for each item in arrays call splice() on the target with the parameters provided by the item.）。
- {$set: any} 整体替换目标（replace the target entirely.）。
- {$merge: object} 合并目标和object的键。
- {$apply: function} 传入当前的值到函数，然后用新返回的值更新它（passes in the current value to the function and updates it with the new returned value.）。
