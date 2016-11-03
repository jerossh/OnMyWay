网页开发时，常常需要了解某个元素是否进入了"视口"（viewport），即用户能不能看到它。

传统的实现方法是，监听到 **scroll** 事件后，调用目标元素（绿色方块）的 **getBoundingClientRect()** 方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于 **scroll** 事件密集发生，计算量很大，容易造成性能问题。

目前有一个新的 **IntersectionObserver API**，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。

等全面支持了在学习，

地址： [IntersectionObserver](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
