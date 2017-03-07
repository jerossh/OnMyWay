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
insertSort('12');