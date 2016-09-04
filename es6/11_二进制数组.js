// 二进制数组（ArrayBuffer对象、TypedArray视图和DataView视图）是JavaScript操作二进制数据的一个接口。这些对象早就存在，
// 属于独立的规格（2011年2月发布），ES6将它们纳入了ECMAScript规格，并且增加了新的方法。

// 这个接口的原始设计目的，与WebGL项目有关。所谓WebGL，就是指浏览器与显卡之间的通信接口，为了满足JavaScript与显卡之间大量的、
// 实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。

// 二进制数组由三类对象组成。
// 1）ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
// 2）TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图, Float32Array（32位浮点数）数组视图等等。
// 3）DataView视图：可以自定义复合格式的视图，比如第一个字节是Uint8（无符号8位整数）、第二、三个字节是Int16（16位整数）、第四个字节开始是Float32（32位浮点数）等等，此外还可以自定义字节序。

// 注意，二进制数组并不是真正的数组，而是类似数组的对象。
// 很多浏览器操作的API，用到了二进制数组操作二进制数据，下面是其中的几个。
      File API
      XMLHttpRequest
      Fetch API
      Canvas
      WebSockets

// 1 ArrayBuffer 对象
// ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。
var buf = new ArrayBuffer(32);

// TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，还可以接受普通数组作为参数，
// 直接分配内存生成底层的ArrayBuffer实例，并同时完成对这段内存的赋值。
var typedArray = new Uint8Array([0,1,2]);
typedArray.length // 3
typedArray[0] = 5;
typedArray // [5, 1, 2]

// ArrayBuffer实例的byteLength属性
var buffer = new ArrayBuffer(32);
buffer.byteLength    // 32
// 如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。
if (buffer.byteLength === n) {
  // 成功
} else {
  // 失败
}

// ArrayBuffer实例有一个slice方法

// ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。
// 这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。


// 2 TypedArray 视图
// ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）
// 目前，TypedArray视图一共包括9种类型，每一种视图都是一种构造函数。
      Int8Array：8位有符号整数，长度1个字节。
      Uint8Array：8位无符号整数，长度1个字节。
      Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。
      Int16Array：16位有符号整数，长度2个字节。
      Uint16Array：16位无符号整数，长度2个字节。
      Int32Array：32位有符号整数，长度4个字节。
      Uint32Array：32位无符号整数，长度4个字节。
      Float32Array：32位浮点数，长度4个字节。
      Float64Array：64位浮点数，长度8个字节。

// 普通数组与TypedArray数组的差异主要在以下方面。
      TypedArray数组的所有成员，都是同一种类型。
      TypedArray数组的成员是连续的，不会有空位。
      TypedArray数组成员的默认值为0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是10个空位；new Uint8Array(10)返回一个TypedArray数组，里面10个成员都是0。
      TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。

// 构造函数
// 1）TypedArray(buffer, byteOffset=0, length?)
// 创建一个8字节的ArrayBuffer
var b = new ArrayBuffer(8);
// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
var v1 = new Int32Array(b);
// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
var v2 = new Uint8Array(b, 2);
// 创建一个指向b的Int16视图，开始于字节2，长度为2
var v3 = new Int16Array(b, 2, 2);

// 注意，byteOffset必须与所要建立的数据类型一致，否则会报错。
var buffer = new ArrayBuffer(8);
var i16 = new Int16Array(buffer, 1);    // Uncaught RangeError: start offset of Int16Array should be a multiple of 2
// 符号的16位整数需要两个字节，所以byteOffset参数必须能够被2整除

// 2）TypedArray(length)
// 视图还可以不通过ArrayBuffer对象，直接分配内存而生成。
var f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];

// 3）TypedArray(typedArray)
// TypedArray数组的构造函数，可以接受另一个TypedArray实例作为参数。
var typedArray = new Int8Array(new Uint8Array(4));
var x = new Int8Array([1, 1]);
var y = new Int8Array(x);
x[0] // 1
y[0] // 1
x[0] = 2;
y[0] // 1
// 如果想基于同一段内存，构造不同的视图，可以采用下面的写法。
var x = new Int8Array([1, 1]);
var y = new Int8Array(x.buffer);
x[0] // 1
y[0] // 1
x[0] = 2;
y[0] // 2

// 4）TypedArray(arrayLikeObject)
// 构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。
var typedArray = new Uint8Array([1, 2, 3, 4]);
// 注意，这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图。
// TypedArray数组也可以转换回普通数组。
var normalArray = Array.prototype.slice.call(typedArray);

// 普通数组的操作方法和属性，对TypedArray数组完全适用。
      TypedArray.prototype.copyWithin(target, start[, end = this.length])
      TypedArray.prototype.entries()
      TypedArray.prototype.every(callbackfn, thisArg?)
      TypedArray.prototype.fill(value, start=0, end=this.length)
      TypedArray.prototype.filter(callbackfn, thisArg?)
      TypedArray.prototype.find(predicate, thisArg?)
      TypedArray.prototype.findIndex(predicate, thisArg?)
      TypedArray.prototype.forEach(callbackfn, thisArg?)
      TypedArray.prototype.indexOf(searchElement, fromIndex=0)
      TypedArray.prototype.join(separator)
      TypedArray.prototype.keys()
      TypedArray.prototype.lastIndexOf(searchElement, fromIndex?)
      TypedArray.prototype.map(callbackfn, thisArg?)
      TypedArray.prototype.reduce(callbackfn, initialValue?)
      TypedArray.prototype.reduceRight(callbackfn, initialValue?)
      TypedArray.prototype.reverse()
      TypedArray.prototype.slice(start=0, end=this.length)
      TypedArray.prototype.some(callbackfn, thisArg?)
      TypedArray.prototype.sort(comparefn)
      TypedArray.prototype.toLocaleString(reserved1?, reserved2?)
      TypedArray.prototype.toString()
      TypedArray.prototype.values()
// 注意，TypedArray数组没有concat方法。如果想要合并多个TypedArray数组，可以用下面这个函数。
function concatenate(resultConstructor, ...arrays) {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new resultConstructor(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4))    // Uint8Array [1, 2, 3, 4]
// 另外，TypedArray数组与普通数组一样，部署了Iterator接口，所以可以被遍历。
let ui8 = Uint8Array.of(0, 1, 2);
for (let byte of ui8) {
  console.log(byte);
}
// 0
// 1
// 2


// 字节序
// 字节序指的是数值在内存中的表示方式。
var buffer = new ArrayBuffer(16);
var int32View = new Int32Array(buffer);
for (var i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2;
}
// 上面代码生成一个16字节的ArrayBuffer对象，然后在它的基础上，建立了一个32位整数的视图。
// 于每个32位整数占据4个字节，所以一共可以写入4个整数，依次为0，2，4，6。

var buffer = new ArrayBuffer(16);
var int16View = new Int16Array(buffer);

for (var i = 0; i < int16View.length; i++) {
  console.log("Entry " + i + ": " + int16View[i]);
}
// Entry 0: 0
// Entry 1: 0
// Entry 2: 2
// Entry 3: 0
// Entry 4: 4
// Entry 5: 0
// Entry 6: 6
// Entry 7: 0
// 用chrome测试与书上不一样:
// Entry 0: 0
// Entry 1: 0
// Entry 2: 0
// Entry 3: 0
// Entry 4: 0
// Entry 5: 0
// Entry 6: 0
// Entry 7: 0

// BYTES_PER_ELEMENT属性


// ... 跳过大量目前对我没用的


// 5 二进制数组的应用
// AJAX
// 传统上，服务器通过AJAX操作只能返回文本数据，即responseType属性默认为text。
// XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。
// 如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；如果不知道，就设为blob。
var xhr = new XMLHttpRequest();
xhr.open('GET', someUrl);
xhr.responseType = 'arraybuffer';
xhr.onload = function () {
  let arrayBuffer = xhr.response;
  // ···
};
xhr.send();
// 如果知道传回来的是32位整数，可以像下面这样处理。
xhr.onreadystatechange = function () {
  if (req.readyState === 4 ) {
    var arrayResponse = xhr.response;
    var dataView = new DataView(arrayResponse);
    var ints = new Uint32Array(dataView.byteLength / 4);
    xhrDiv.style.backgroundColor = "#00FF00";
    xhrDiv.innerText = "Array is " + ints.length + "uints long";
  }
}

// Canvas
// 网页Canvas元素输出的二进制像素数据，就是TypedArray数组。
// Uint8ClampedArray 格式：这个视图类型的特点，就是专门针对颜色，把每个字节解读为无符号的8位整数，即只能取值0～255

// WebSocket
var socket = new WebSocket('ws://127.0.0.1:8081');
socket.binaryType = 'arraybuffer';
// Wait until socket is open
socket.addEventListener('open', function (event) {
  // Send binary data
  var typedArray = new Uint8Array(4);
  socket.send(typedArray.buffer);
});
// Receive binary data
socket.addEventListener('message', function (event) {
  var arrayBuffer = event.data;
  // ···
});

// Fetch API
fetch(url)
.then(function(request){
  return request.arrayBuffer()
})
.then(function(arrayBuffer){
  // ...
});

// File API
var fileInput = document.getElementById('fileInput');
var file = fileInput.files[0];
var reader = new FileReader();
reader.readAsArrayBuffer(file);
reader.onload = function () {
  var arrayBuffer = reader.result;
  // ···
};
// 文件系统主要是 node 的吧
