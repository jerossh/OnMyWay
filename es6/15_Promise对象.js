// 1 Promise 的含义
// Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

// 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
// 从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

// Promise对象有以下两个特点。
// 1）对象的状态不受外界影响。
// Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。
// 2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
// Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。

// Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
// 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
// 第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

// 如果某些事件不断地反复发生，一般来说，使用stream模式是比部署Promise更好的选择。



// 2 基本用法
// ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
// 下面代码创造了一个Promise实例。
var promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
// 它们是两个函数，由JavaScript引擎提供，不用自己部署。

// Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
// then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，
// 第二个回调函数是Promise对象的状态变为Reject时调用。
// 其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

// 下面是一个Promise对象的简单例子。
function timeout(ms) {
  return new Promise((resolve, reject) => {
    console.log('go');
    setTimeout(resolve, ms, 'done');
  });
}
timeout(100).then((value) => {
  console.log(value);
});

// Promise新建后就会立即执行。
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});
promise.then(function() {
  console.log('Resolved.');
});
console.log('Hi!');
// Promise
// Hi!
// Resolved

// 下面是异步加载图片的例子。
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
    image.src = url;
  });
}

// 下面是一个用Promise对象实现的Ajax操作的例子。
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};
getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

// reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，
// 还可能是另一个Promise实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，比如像下面这样。
var p1 = new Promise(function (resolve, reject) {
  // ...
});
var p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
// 上面代码中，p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。
// 注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是Pending，那么p2的回调函数就会等待p1的状态改变；
// 如果p1的状态已经是Resolved或者Rejected，那么p2的回调函数将会立刻执行。
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
// 上面代码中，p1是一个Promise，3秒之后变为rejected。p2的状态在1秒之后改变，resolve方法返回的是p1。此时，
// 由于p2返回的是另一个Promise，所以后面的then语句都变成针对后者（p1）。又过了2秒，p1变为rejected，
// 导致触发catch方法指定的回调函数。



// 3 Promise.prototyep.then()
