/* 
 * 对数组进行快速排序
 *prama {array} arr 需要是数组
 *return {array} 返回排序后的数组
 */

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

function quickSort(arr) {
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
        throw new Error("参数要求是数组");
    }
    var len = arr.length
    for (var i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                var swap = arr[i];
                arr[i] = arr[j];
                arr[j] = swap;
                console.log(i, j, swap)
                continue; // 一直交换到最小
            }
        }
    }
    return arr;
}
var arr = [3, 4, 2, 4, 1, 1, 1, 5, 9, 3];
quickSort(arr);