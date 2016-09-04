// 1 Set
// ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
// Set本身是一个构造函数，用来生成Set数据结构。
var s = new Set()
;[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x))
for (let i of s) {
  console.log(i)
}
// 上面代码通过add方法向Set结构加入成员，结果表明Set结构不会添加重复的值。

var set = new Set([1, 2, 3, 4, 4]);
set         // Set {1, 2, 3, 4}
[...set]    // [1, 2, 3, 4]
set.size    // 4

// Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。
function divs () {
  return [...document.querySelectorAll('div')];
}
divs().length     // 8
var set = new Set(divs());
set.size          // 8

// 去除数组的重复成员
[...new Set(array)]

// 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值
// 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
// Set内部判断两个值是否不同，使用的算法叫做“Same-value equality”，
// 它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
// 另外，两个对象总是不相等的!!!
let set = new Set();
set.add({});
set.size // 1
set.add({});
set.size // 2


// 实例和方法
// Set结构的实例有以下属性。
Set.prototype.constructor   // 构造函数，默认就是Set函数。
Set.prototype.size          // 返回Set实例的成员总数。
// Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
add(value)            // 添加某个值，返回Set结构本身。
delete(value)         // 删除某个值，返回一个布尔值，表示删除是否成功。
has(value)            // 返回一个布尔值，表示该值是否为Set的成员。
clear()               // 清除所有成员，没有返回值。

// 下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。
// 对象的写法
var properties = {
  'width': 1,
  'height': 1
};
if (properties[someName]) {
  // do something
}
// Set的写法
var properties = new Set();
properties.add('width');
properties.add('height');
if (properties.has(someName)) {
  // do something
}
// Array.from方法可以将Set结构转为数组。
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);


// Set结构的实例有四个遍历方法，可以用于遍历成员。
keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员
// 需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用。
// 1）keys()，values()，entries()
// key方法和value方法的行为完全一致。
for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
// Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
Set.prototype[Symbol.iterator] === Set.prototype.values
// true
// 这意味着，可以省略values方法，直接用for...of循环遍历Set。
let set = new Set(['red', 'green', 'blue']);
for (let x of set) {
  console.log(x);
}
// red
// green
// blue
// 2）forEach()
let set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2) )
// 2
// 4
// 6
// 扩展运算符和Set结构相结合，就可以去除数组的重复成员。
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]

// 数组的map和filter方法也可以用于Set了。
// 因此使用Set可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
