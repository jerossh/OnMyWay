/* 
 * 对数组进行快速排序
 *prama {array} arr 需要是数组
 *return {array} 返回排序后的数组
 *url https://sort.hust.cc/4.shellSort.html
 */


// 冒泡排序
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            while (arr[j] > arr[j + 1]) {
                var swap = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = swap;
            }
        }
    }
    return arr;
}
var arr = [3, 4, 2, 4, 1, 1, 1, 5, 9, 3];
bubbleSort(arr);

// 选择排序
function quickSort(arr) {
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
        throw new Error("参数要求是数组");
    }
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            // if (arr[i] > arr[j]) {
            //     var swap = arr[i];
            //     arr[i] = arr[j];
            //     arr[j] = swap;
            //     console.log(i, j, swap)
            //     continue; // 一直交换到最小
            // }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
var arr = [3, 4, 2, 4, 1, 1, 1, 5, 9, 3];
quickSort(arr);


// 插入排序
function insertSort(arr) { // 插入快排
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
        throw new Error("参数要求是数组");
    }
    var len = arr.length;

    for (var i = 1; i < len; i++) {
        var key = arr[i];
        j = i;
        while (--j > -1) {
            if (arr[j] > key) {
                arr[j + 1] = arr[j]; // 前面比后面大
            } else {
                break;
            }
        }
        arr[j + 1] = key;
    }
    return arr;
}
var arr = [3, 4, 2, 4, 1, 1, 1, 5, 9, 3];
insertSort(arr);


// 希尔排序
function shellSort(arr) { // 先一部分排序，再整体排序
    var len = arr.length,
        tem,
        gap = 1;
    while (gap < len) {
        gap = gap * 3 + 1; // 显示大跨度 4， 最后 gap
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) { // gap = 4, gap = 1;
        for (var i = gap; i < len; i++) { // i = 4, 到 i = 10
            temp = arr[i];
            // console.log(i)
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) { // 0,1,2
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp; // j 无法运行的时候，在填回来
        }
    }
    return arr;
}
var arr = [3, 4, 2, 4, 1, 1, 1, 5, 9, 3];
shellSort(arr);

// 归并排序,自上而下归并
function mergeSort(arr) {
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) { // 不管左边右边，小的先移除
            result.push(left.shift());
        } else {
            result.push(right.shift())
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }
    return result;
}
var arr = [3, 6, 2, 5, 1, 1, 1, 5, 9, 3];
mergeSort(arr);

// 快速排序，效率高
// 快速排序的最坏运行情况是 O(n²)，比如说顺序数列的快排。但它的平摊期望时间是 O(nlogn)，且 O(nlogn) 记号中隐含的常数因子很小，
// 比复杂度稳定等于 O(nlogn) 的归并排序要小很多。所以，对绝大多数顺序性较弱的随机数列而言，快速排序总是优于归并排序。
function partition(arr, left, right) {
    var pivot = left, // 基准
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++; // 比基准小的都放在基准后面
        }
    }
    swap(arr, pivot, index - 1); // 循环结束后，基准于最后一位比他小的调换
    return index - 1; // 返回处理过的最后一个位置
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left !== 'number' ? 0 : left,
        right = typeof right !== 'number' ? len - 1 : right;
    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1); // 对分区排序过的进行递归
        quickSort(arr, partitionIndex + 1, right); // 递归继续处理未排序的
    }
    return arr;
}
var arr = [3, 6, 2, 5, 1, 1, 1, 5, 9, 3];
quickSort(arr);