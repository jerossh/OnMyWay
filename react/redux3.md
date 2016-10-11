前两篇教程介绍了 Redux 的基本用法和异步操作，今天是最后一部分，介绍如何在 React 项目中使用 Redux。

为了方便使用，Redux 的作者封装了一个 React 专用的库 React-Redux，本文主要介绍它。

这个库是可以选用的。实际项目中，你应该权衡一下，是直接使用 Redux，还是使用 React-Redux。后者虽然提供了便利，但是需要掌握额外的 API，并且要遵守它的组件拆分规范。

## UI 组件

## 容器组件

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API

## connect()

## mapStateToProps()

## mapDispatchToProps()

## &lt;Provider> 组件

## 例：计数器

## React-Router 路由库
