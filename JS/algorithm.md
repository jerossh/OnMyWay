## 知识扩充：
- 时间复杂度：算法的时间复杂度是一个函数，描述了算法的运行时间。时间复杂度越低，效率越高。
- 自我理解:一个算法，运行了几次时间复杂度就为多少，如运行了n次，则时间复杂度为O(n)。

## 冒泡排序
相邻比较
```js
function sort (elements) {
    for (var i = 0; i < elements.length -1; i++) {
        for (var j = 0; j < elements.length - i - 1; j ++) {
            if (elements[j] > elements[j+1]) {    // r如果比较小，则交换
                var swap = elements[j];
                elements[j] = elements[j+1];
                elements[j+1] = swap;  
            }
        }
    }
}

var elements = [3, 1, 5, 7];
console.log('before: ' + elements);   // 3,1,5,7
sort(elements);
console.log('after: ' + elements);    // 1,3,5,7
```

## 快速排序
冒泡排序的改良

第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。

```js
function quickSort(elements) {
    if (elements.length <= 1) {return elements}

    var pivotIndex = Math.floor (elements.length / 2);  // 两部分
    var pivot = elements.splice(pivotIndex, 1)[0];  // 取中间那个值
    
    var left  = [], right = [];
    for (var i = 0; i < elements.length; i ++) {
        if (elements[i] < pivot) {
            left.push(elements[i]);
        } else {
            right.push(elements[i]);
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));  // 递归，不行。。。
}
var elements = [3, 1, 5, 7];
console.log(quickSort(elements));    // 1,3,5,7
```

## 插入排序

```js
function insertSort (elements) {
    var i = 1, j, len = elements.length;

    for (;i < len; i++) {  // 前面 封号
        j = i;
        key = elements[j];  // 标杆

        while (--j > -1) {  // j 自减 1，直到 第 0 位
            if (elements[j] > key) {
                elements[j + 1] = elements[j];  // 比key大的不断后移一位
            } else {
                break;      // 直到遇见 小于等于自己的，跳出循环
            }
        }

        elements[j + 1] = key;  // 插入位置
        console.log(elements)
    }

    return elements;
}
var elements = [3, 1, 5, 7, 9, 6, 3];
console.log(insertSort(elements));    // 1, 3, 3, 5, 6, 7, 9
```

## 二分查找

查找该数据在表中位置，合适于有序的列表，提高效率
```js
// 递归实现
function binarySearch(data, target, start, end) {
    var end   = end || data.length - 1;
    var start = start || 0;
    var m     = Math.floor((start + end) / 2);  // 位置均值

    if (data[m] === target) {
        return m;
    } else if (target < data[m]) {
        return binarySearch(data, target, start, m - 1);  // 递归调用
    } else {
        return binarySearch(data, target, m + 1, end);
    }
    return false;
}

var arr = [-34, 1, 3, 4, 5, 8, 34, 45, 65, 87];  // 有序
binarySearch(arr,  5);

// 非递归实现
function binarySearch(data, target) {
    var h = data.length - 1,
        l = 0;
    
    while (l <= h) {
        var m = Math.floor((h + l) / 2);

        if (data[m] === target) {
            return m;
        }

        if (target > data[m]) {  // 如果大于中间值
            l = m + 1;   // 起始：中间位置+1
        } else {                  
            h = m -1;    // 结束：中间位置-1   
        }
    }

    return false;
}
var arr = [-34, 1, 3, 4, 5, 8, 34, 45, 65, 87];  // 有序
binarySearch(arr,  5);
```


