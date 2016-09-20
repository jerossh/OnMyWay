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




// 2 WeakSet
// 首先，WeakSet的成员只能是对象，而不能是其他类型的值。
// 其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，
//    也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。
// WeakSet是一个构造函数，可以使用new命令，创建WeakSet数据结构。
var ws = new WeakSet();
// 作为构造函数，WeakSet可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有iterable接口的对象，都可以作为WeakSet的参数。）该数组的所有成员，都会自动成为WeakSet实例对象的成员。
var a = [[1,2], [3,4]];
var ws = new WeakSet(a);
ws      // WeakSet {[1, 2], [3, 4]}
var b = [3, 4];
var ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)

// WeakSet结构有以下三个方法。
WeakSet.prototype.add(value)          // 向WeakSet实例添加一个新成员。
WeakSet.prototype.delete(value)       // 清除WeakSet实例的指定成员。
WeakSet.prototype.has(value)          // 返回一个布尔值，表示某个值是否在

// WeakSet没有size属性，没有办法遍历它的成员。
ws.size // undefined
ws.forEach // undefined
ws.forEach(function(item){ console.log('WeakSet has ' + item)})     // TypeError: undefined is not a function

// WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。




// 3 Map
// Map结构的目的和基本用法
var data = {};
var element = document.getElementById('myDiv');
data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
// 上面代码原意是将一个DOM节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。
var m = new Map();
var o = {p: "Hello World"};
m.set(o, "content")
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false
// 上面代码使用set方法，将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。
var map = new Map([['name', '张三'], ['title', 'Author']]);
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
// 如果对同一个键多次赋值，后面的值将覆盖前面的值。
let map = new Map();
map
.set(1, 'aaa')
.set(1, 'bbb');
map.get(1) // "bbb"
// 如果读取一个未知的键，则返回undefined。
new Map().get('asfddfsasadf')       // undefined
// 下面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
var map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined
下面代码中，变量k1和k2的值是一样的，但是它们在Map结构中被视为两个键。
var map = new Map();
var k1 = ['a'];
var k2 = ['a'];
map
.set(k1, 111)
.set(k2, 222);
map.get(k1) // 111
map.get(k2) // 222

// 如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，包括0和-0。另外，虽然NaN不严格相等于自身，但Map将其视为同一个键。
// 实例的属性和操作方法
size
set(key, value)
get(key)
has(key)
delete(key)
clear()

// 遍历方法
keys()            // 返回键名的遍历器。
values()          // 返回键值的遍历器。
entries()         // 返回所有成员的遍历器。
forEach()         // 遍历Map的所有成员。
// 需要特别注意的是，Map的遍历顺序就是插入顺序。
// Map结构转为数组结构，比较快速的方法是结合使用扩展运算符（...）。
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
[...map.keys()]   // [1, 2, 3]
[...map.values()]   // ['one', 'two', 'three']
[...map.entries()]    // [[1,'one'], [2, 'two'], [3, 'three']]
[...map]    // [[1,'one'], [2, 'two'], [3, 'three']]
// 此外，Map还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
// forEach方法还可以接受第二个参数，用来绑定this。
var reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};
map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);



// 与其他数据结构的互相转换
// 1）Map转为数组
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]    // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
// 2）数组转为Map
new Map([[true, 7], [{foo: 3}, ['abc']]])   // Map {true => 7, Object {foo: 3} => ['abc']}
// 3）Map转为对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
// 4）对象转为Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
objToStrMap({yes: true, no: false})     // [ [ 'yes', true ], [ 'no', false ] ]
// 5）Map转为JSON
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));       // 里面上面转成对象
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)     // '{"yes":true,"no":false}'
// 6）JSON转为Map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));        // 里面上面转成对象
}
jsonToStrMap('{"yes":true,"no":false}')     // Map {'yes' => true, 'no' => false}
// 但是，有一种特殊情况，整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为JSON的逆操作。
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]')     // Map {true => 7, Object {foo: 3} => ['abc']}



// 4 weakMap
// WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();
myWeakmap.set(myElement, {timesClicked: 0});
myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
  myWeakmap.set(myElement, logoData);
}, false);
// 上面代码中，myElement是一个DOM节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在WeakMap里，对应的键名就是myElement。一旦这个DOM节点删除，该状态就会自动消失，不存在内存泄漏风险。


// 总结：
// set 是另一种数组
// map 是另一种对象
