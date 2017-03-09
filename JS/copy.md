## 浅复制
```js
var arr = [2, , 3, 4, 4, 5];
var arr2 = arr; // 浅拷贝
arr[1] = 100;
console.log(arr2); // [2, 100, 3, 4, 4, 5], 对象都是指针引用。arr，arr2指向同一个数组
```
// 如果要处理数据，又要备份原来的，就麻烦了。

## 数组的深复制
```js
var arr = [1, 2, , 3, 4];
var arr2 = arr.slice(0, arr.length); // 深复制
arr[2] = 100;
console.log(arr, arr2);
// 其他深复制还有 concat
var arr = [1, 2, , 3, 4];
var arr2 = [].concat(arr);
arr[2] = 100;
console.log(arr, arr2);
```

## 对象的深复制
```js
function deepCopy(source) {
    var result = {};
    for (var key in source) {
        // result[key] = source[key]; // key里如果有对象， 这样子就是 浅复制
        result[key] = typeof source[key] === 'object'?deepCopy(source[key]):source[key];
    }
    return result;
}
var sr = {
    k: 1,
    j: {
        j:3
    },
    f: 3
};

var obj2 = deepCopy(sr);
sr.k =666;
sr.j.j = 999;

console.log(obj2);
```

```js
// 深度优先遍历复制, 借助队列
function deepCopy(obj) {
    var newObj = {}, // 寻找这个指针
        srcQueue = [obj], srcVisitedQueue = [],
        copyQueue = [newObj], copyVisitedQueue = [];

    while (srcQueue.length > 0) {
        var currentSrcElement = srcQueue.shift(), // 源文件
            currentCopyElement = copyQueue.shift(); // 备份

        srcVisitedQueue.push(currentSrcElement);
        copyVisitedQueue.push(currentCopyElement);  // 放到这个里面是什么意思？

        for (var key in currentSrcElement) {
            if (typeof currentCopyElement[key] !== 'object') {
                currentCopyElement[key] = currentSrcElement[key];
            } else {
                // 有环的情况
                var index = srcVisitedQueue.indexOf(currentSrcElement[key]);
                if (index >= 0) {
                    currentCopyElement[key] = copyVisitedQueue[index];
                } else {
                    srcQueue.push(currentSrcElement[key]);
                    currentCopyElement[key] = {}; // 修改这个引用，currentCopyElement[key] 的内容也会变
                    copyQueue.push(currentCopyElement[key]);
                }
            }
        }
    }

    return newObj;
}
var obj1 = {a: 1, b: 2};
obj2 = deepCopy(obj1);
obj1.a =3;
console.log(obj1, obj2);

// Test case
// 1. 只含有简单类型的Object{a: 1, b:2} => pass
// 2. 简单类型和复杂类型同时存在的情况下的Object => pass:
// var obj1 = {
//     a: 1,
//     b: 2,
//     c: {
//         d: 3,
//         e: {
//             f: 4,
//             g: 5
//         }
//     },
//     h: {
//         i: 6,
//         j: 7
//     }
// };
// 3. 有环的情况下的Object => pass:
var obj1 = {
    a: 1,
    b: 2,
    c: obj1  // 会变成 undefined
};
console.log(obj1)
```
