## [React](http://www.css88.com/react/docs/update.html)

- React.createClass
- React.createElement
- React.createFactory
- React.render
- React.unmountComponentAtNode
- React.renderToString
- React.renderToStaticMarkup
- React.isValidElement
- React.DOM
- React.PropTypes
- React.initializeTouchEvents
- React.Children
  - React.Children.map
  - React.Children.forEach
  - React.Children.count
  - React.Children.only

## ReactComponent

- setState
- replaceState
- forceUpdate()
- getDOMNode
- isMounted()
- setProps
- replaceProps

## Component Specs and Lifecycle

### Component Specifications

- render
    当调用的时候，会检测 this.props 和 this.state，返回一个单子级组件。该子级组件可以是虚拟的本地 DOM 组件（比如 <div /> 或者 React.DOM.div()），也可以是自定义的复合组件。
- getInitialState
    在组件挂载之前调用一次。返回值将会作为 this.state 的初始值。
- getDefaultProps
    getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
- propTypes
    propTypes 对象允许验证传入到组件的 props。
- mixins
    mixin 数组允许使用混合来在多个组件之间共享行为。
- statics
    statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。
- displayName
    displayName 字符串用于输出调试信息。

## 可复用组件

设计接口的时候，把通用的设计元素（按钮，表单框，布局组件等）拆成接口良好定义的可复用的组件。

### Prop 验证

React.PropTypes 提供很多验证器 (validator) 来验证传入数据的有效性。当向 props 传入无效数据时，JavaScript 控制台会抛出警告。注意为了性能考虑，只在开发环境验证 propTypes

### 默认 Prop 值

### 传递 Props：小技巧

  - JSX 的 spread 语法
  - 单个子级

### Mixins

## 传递 Props

可以使用 JSX 展开属性 来合并现有的 props 和其它值：

```js
return <Component {...this.props} more="values" />;
```

等价于

```js
return Component(Object.assign({}, this.props, { more: 'values' }));
```

### 手动传递
