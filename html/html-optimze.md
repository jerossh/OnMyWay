回流（Reflow）是指布局引擎为frame计算图形的过程。 frame是一个矩形，拥有宽高和相对父容器的偏移。frame用来显示盒模型（content model）， 但一个cont
ent model可能会显示为多个frame，比如换行的文本每行都会显示为一个frame。

重绘（Repaint）发生在元素的可见性发生变化时，比如背景色、前景色等。 因此回流必然会引起重绘。
