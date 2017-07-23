// 二分搜索算法
// 非递归
function binary_search(arr, key) {
    var start = 0;
    var end = arr.length - 1;
    while (start <= end) { // 要一个相等的情况，考虑只剩两个的情况
        var mid = parseInt((start + end) / 2);
        console.log(mid);
        if (key === arr[mid]) {
            return mid;
        } else if (key > arr[mid]) {
            start = mid + 1;
        } else if (key < arr[mid]) {
            end = mid - 1;
        }
    }
    return -1;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 23, 44, 86];
binary_search(arr, 1);
binary_search(arr, 0);

// 递归
function binary_search(arr, key, start, end) {
    if (start > end) {
        return -1;
    }

    start = start || 0;
    end = end || arr.length - 1;

    var mid = parseInt((start + end) / 2);
    if (key === arr[mid]) {
        console.log(mid);
        return mid;
    } else if (key > arr[mid]) {
        binary_search(arr, key, mid + 1, end);
    } else if (key < arr[mid]) {
        binary_search(arr, key, start, mid - 1);
    }
    return -1;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 23, 44, 86];
binary_search(arr, 0);