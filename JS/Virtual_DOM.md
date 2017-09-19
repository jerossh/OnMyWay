https://github.com/livoras/blog/issues/13

1 前言
2 对前端应用状态管理思考
3 Virtual DOM 算法
4 算法实现
4.1 步骤一：用JS对象模拟DOM树
4.2 步骤二：比较两棵虚拟DOM树的差异
4.3 步骤三：把差异应用到真正的DOM树上
5 结语
6 References

本文会在教你怎么用 300~400 行代码实现一个基本的 Virtual DOM 算法，并且尝试尽量把 Virtual DOM 的算法思路阐述清楚。希望在阅读本文后，能让你深入理解 Virtual DOM 算法，给你现有前端的编程提供一些新的思考。

本文所实现的完整代码存放在 [Github](https://github.com/livoras/simple-virtual-dom)。

