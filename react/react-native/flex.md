## 一：理论知识点
### 1:什么是FlexBox布局?
Flex布局主要思想是：让容器有能力让其子项目能够改变其宽度、高度（甚至是顺序），以最佳方式填充可用空间；

### 2:Flex布局基于flex-flow流

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列，单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

### 3: React Native中flex
在React中，Flexbox有6种容器属性，6种项目属性。而在React Native中，有4个容器属性，2个项目属性，分别是：

- 容器属性：flexDirection   flexWrap   justifyContent  alignItems
- 项目属性：flex  alignSelf
