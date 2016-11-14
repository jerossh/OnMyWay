// 1 Array.from()
// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

// 实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});
// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

// 只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组。
Array.from('hello')    // ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

// 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
Array.from([1, 2, 3])    // [1, 2, 3]

// 值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。
// arguments对象
function foo() {
  var args = [...arguments];
}
// NodeList对象
[...document.querySelectorAll('div')]
// 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。
// 本质特征只有一点，即必须有length属性
// 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。!!!!!!!!
Array.from({ length: 3 });    // [ undefined, undefined, undefined ]   扩展运算符转换不了这个对象

// es5 部署
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();

// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x)   // [1, 4, 9]
// 下面的例子是取出一组DOM节点的文本内容。
let spans = document.querySelectorAll('span.name');
// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);
// Array.from()
let names2 = Array.from(spans, s => s.textContent)

// 下面的例子将数组中布尔值为false的成员转为0。
Array.from([1, , 2, , 3], (n) => n || 0)    // [1, 0, 2, 0, 3]
// 另一个例子是返回各种数据的类型。
function typesOf () {
  return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)  // ['object', 'object', 'number']

// Array.from()可以将各种值转为真正的数组，并且还提供map功能
Array.from({ length: 2 }, () => 'jack')   // ['jack', 'jack']
// Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。
function countSymbols(string) {
  return Array.from(string).length;
}
// 测试
var str = "我爱你"
var len = str.length        // 这个是可以正确识别的
var realLen = Array.from(str).length
console.log(len +':'+ realLen);   // 3:3
// 测试2
var str = "\u6211\u7231\u4f60"      // "我爱你"
var len = str.length
var realLen = Array.from(str).length
console.log(len +':'+ realLen);  // 3:3

// 2 Array.of()
// Array.of方法用于将一组值，转换为数组。
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
// 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
// Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
// 模拟
function ArrayOf(){
  return [].slice.call(arguments);
}


// 数组实例的copyWithin()
// 它接受三个参数。
// target（必需）：从该位置开始替换数据。
// start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
[1, 2, 3, 4, 5].copyWithin(0, 3)    // [4, 5, 3, 4, 5]
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]
// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}
// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]
// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]


// 数组实例的find()和findIndex()
[1, 4, -5, 10].find((n) => n < 0)       // -5  用于找出第一个符合条件的数组成员
// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置
[1, 5, 10, 15].findIndex(val => val > 10, this) // 3
[1, 5, 10, 15].findIndex(val => val > 10, window) // 3
[1, 5, 10, 15].findIndex(val => val > 10, []) // 3
// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
// 另外，这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。
[NaN].indexOf(NaN)  // -1
[NaN].findIndex(y => Object.is(NaN, y))   // 0


// 数组实例的fill()
['a', 'b', 'c'].fill(7)   // [7, 7, 7]
new Array(3).fill(7)     // [7, 7, 7]
['a', 'b', 'c'].fill(7, 1, 2)   // ['a', 7, 'c']



// 6 数组实例的entries()，keys()和values()
// ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，
// 唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

// 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']


// 7 数组实例的includes()  ES7
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true
[NaN].includes(NaN)        // true



// 8 数组的空位
Array(3) // [, , ,]
// 注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false

// ES5对空位的处理，已经很不一致了，大多数情况下会忽略空位。
// forEach(), filter(), every() 和some()都会跳过空位。
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1
// filter方法
['a',,'b'].filter(x => true) // ['a','b']
// every方法
[,'a'].every(x => x==='a') // true
// some方法
[,'a'].some(x => x !== 'a') // false
// map方法
[,'a'].map(x => 1) // [,1]
// join方法
[,'a',undefined,null].join('#') // "#a##"
// toString方法
[,'a',undefined,null].toString() // ",a,,"

// ES6则是明确将空位转为undefined。
// Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
Array.from(['a',,'b'])        // [ "a", undefined, "b" ]
[...['a',,'b']]               // [ "a", undefined, "b" ]
// copyWithin()会连空位一起拷贝。
[,'a','b',,].copyWithin(2,0)  // [,"a",,"a"]
new Array(3).fill('a')        // ["a","a","a"]
// for...of循环也会遍历空位。
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
// 逗号最后那个不算值
// 上面代码中，数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。

// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]
// keys()
[...[,'a'].keys()] // [0,1]
// values()
[...[,'a'].values()] // [undefined,"a"]
// find()
[,'a'].find(x => true) // undefined
// findIndex()
[,'a'].findIndex(x => true) // 0
