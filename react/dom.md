## 与 DOM 的差异

React 为了性能和跨浏览器的原因，实现了一个独立于浏览器的事件和 DOM 系统。利用此功能，可以屏蔽掉一些浏览器的 DOM 的粗糙实现。

- 所有 DOM 的 properties 和 attributes （包括事件处理器）应该都是驼峰命名的，以便和标准的 JavaScript 风格保持一致。我们故意和规范不同，因为规范本身就不一致。然而，data-* 和 aria-* 属性符合规范，应该仅是小写的。
- style 属性接收一个带有驼峰命名风格的 JavaScript 对象，而不是一个 CSS 字符串。这与 DOM 中的 style 的 JavaScript 属性保持一致，更加有效，并且弥补了 XSS 安全漏洞。
- 所有的事件对象和 W3C 规范保持一致，并且所有的事件（包括提交事件）冒泡都正确地遵循 W3C 规范。参考事件系统获取更多详细信息。
- onChange 事件表现得和你想要的一样：当表单字段改变了，该事件就被触发，而不是等到失去焦点的时候。我们故意和现有的浏览器表现得不一致，是因为 onChange 是它的行为的一个错误称呼，并且 React 依赖于此事件来实时地响应用户输入。参考表单获取更多详细信息。
- 表单输入属性，例如 value 和 checked，以及 textarea。这里有更多相关信息。

## 特殊的非 DOM 属性

除了与 DOM 的差异之外，React 也提供了一些 DOM 里面不存在的属性。

- key：可选的唯一的标识器。当组件在渲染过程中被各种打乱的时候，由于差异检测逻辑，可能会被销毁后重新创建。给组件绑定一个 key，可以持续确保组件还存在 DOM 中。更多内容请参考这里。
- ref：参考这里。
- dangerouslySetInnerHTML：提供插入纯 HTML 字符串的功能，主要为了能和生成 DOM 字符串的库整合。更多内容请参考这里。