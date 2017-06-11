hi, 我们团队已经将对原型链的考核移出了面试范围；但闭包还在考核内容之中。

为什么要将原型链移出考察范围？ 

第一、不会再用到了

第二、理解了原型链，对我们写es6程序没帮助；因为es6设计就是要去掉原型以及原型引申出来的N种设计模式的原型实现（见《高级js程序设计》）， 非常复杂，可读性差。 应该去理解es6-class。 从语法上讲，es6-class和原型已经没有关联。


> 另外也说说我的经历5年前我用angular.js，用原型很少。 3年前，用es6就没再用过原型。翻react.js的源代码，现在也只有一些旧代码还在用prototype，新代码基本都是基于es6了。  我认为前端程序员不一定要掌握原型，如果说一点也不知道， 肯定有问题，那是知识边界的问题，就好像c++程序员不知道虚函数表，肯定有问题，但如果面试官一直问虚函数表，那也没什么意义。


为什么闭包还在考核范围中？

因为闭包是我们javascript实现各种各样的封装的基础，函数式编程的基础，将长期使用。 

>我认为我理解原型链的时间白费了。 （纯个人观点，不代表58团队） 同理： es6里面我不会考： let 和var 的区别；因为var不用了，知道区别有什么意义呢？ 学习原型-原型链-掌握原型相关的设计模式， 需要很多小时，同样的时间，足够学习一类算法了， 如学习学习有趣的<The Part-Time Parliament>

下面说说面试： 

我前端面试通常注意这么几个方面：
1. 沟通能力
2. 基础知识
3. 解决实际问题的能力
4. 知识边界

## 沟通能力

面看面试面试者对所有问题的视角，阐述是否准确容易理解。 这是我们团队非常重要的一个指标。 

## 基础知识面

具体基础知识方面，我会重点考察：

- 闭包
- es6 - class

比如说： 类的静态成员和动态成员的区别？ 重点考察多态和类型的设计。比如说mixin和decorator等。

- map/reduce/filter/find这些常用的函数 
- promise和async/await
- 基础算法（比如说什么链表，如何实现一个hash算法， 归并排序的复杂度）
- 前端常用设计模式（比如说subscribe,observable等）
- 进程和线程的区别（什么线程同步）

## 解决问题面
具体到解决实际问题的能力， 我会涉及：
- 组件接口设计 （比如设计一个表单组件/Picker) —— 基于 react 或 vue。 
- 针对面试人员原公司业务逻辑提具体的问题
- 具体的工具（gulp/webpack/rollup) 考察具体的知识点，主要是希望面试者具有：根据自身团队的实际情况选择工具的能力
- 给一个实际问题， 问解决方案

## 知识边界面
知识边界主要是为了确定面试人员的知识范围。

知识边界我会问： 
- 考察一个稍微复杂一点的shell知识点（如awk，xargs等命令)
- 问一个数据库相关知识中稍微有深度一点的（如：什么是锁）
- 问一个缓存先关的问题（如：什么是缓存穿透）
- React/Vue的virtual dom实现原理
- js新特性掌握深度（如symbol-observable， 什么是web-asm）
- 前端方向把握（pwa/electron/react-native）
- node.js的学习情况


保留原作者：58招聘FE团队 魏蒙