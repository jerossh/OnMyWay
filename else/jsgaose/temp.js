// for  https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
var footer = document.getElementsByTagName('footer')[0];
footer.scrollIntoView({block: "end", behavior: "smooth"})

// 回文
function palindrome(str) {
  // Good luck!
  var str1 = str.toLowerCase().replace(/[\s+,.]+/g, '');
  var str2 = str1.split('').reverse().join('');
  console.log(str1);
  console.log(str2);
  return str1 == str2;
}
palindrome("A man, a plan, a canal. Panama")

// 找出最多的单词
function findLongestWord(str) {
  var maxCount = str.split(' ').map(function(val){
    return val.length;
  }).sort(function(a, b){
    return b - a;
  })[0];
  return maxCount;
}
findLongestWord("The quick brown fox jumped over the lazy dog");

// 大写
function titleCase(str) {
  var str = str.split(' ').map(function(value){
    var value1 = value.toLowerCase()
    var first = value1.split('')[0].toUpperCase();
    return first+value1.substring(1);
  }).join(' ');
  return str;
}

titleCase("I'm a little tea pot");

// 最大值数组
function largestOfFour(arr) {
  var newArr =[];
  arr.forEach(function(val) {
    val.sort(function(a, b){
      return b-a;
    });
    newArr.push(val[0]);
  });
  return newArr;
}
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

// 指定的数结尾
function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor
  var len = str.length;
  var lenTar = target.length;
  var lastW = str.substring(len-lenTar);
  console.log(lastW);
  return lastW == target;
}
confirmEnding("Bastian", "n");

// 重复num次
function repeat(str, num) {
  // repeat after me
  var result = '';
  while(num > 0) {
    num--;
    result += str;
  }
  return result;
}
repeat("abc", 3);

// 缩略文
function truncate(str, num) {
  // Clear out that junk in your trunk
  var len = str.length;
  if(len > 3){
    str += '...';
  } else {
    str = str.substr(0, num -3) + '...';
  }
  return str;
}
truncate("A-tisket a-tasket A green and yellow basket", 11);


// 分块
function chunk(arr, size) {
  // Break it up.
  var result = [];
  var begin = 0;
  while (arr.length > size) {
    var item = arr.splice(0, size);
    result.push(item);
  }
  result.push(arr)
  return result;
}
chunk(["a", "b", "c", "d", 'e'], 2);


// 阶段
function slasher(arr, howMany) {
  // it doesn't always pay to be first
  arr = arr.slice(howMany)
  return arr;
}

slasher([1, 2, 3], 2);


// 包含
function mutation(arr) {
  var arr1 = arr[1].split('');
  var result = arr1.every(function(value) {
    var arr2 = arr[0].toLowerCase();
    return arr2.indexOf(value.toLowerCase()) > -1;
  })
  return result;
}
mutation(["hello", "hey"]);


// 删除所有假值
function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  var result = [];
  arr.forEach(function(val) {
    if(val) {
      result.push(val);
    }
  })
  return result;
}

bouncer([7, "ate", "", false, 9]);

function destroyer(arr) {
  // Remove all the values
  var args = Array.prototype.slice.call(arguments);
  var args1 = args[0];
  var args2 = args.slice(1);
  console.log(args2);
  var sargs1.filter(function(val) {
    return args2.indexOf(val) == -1;
  });
  return s;
}
destroyer([1, 2, 3, 1, 2, 3], 2, 3);


// 位置
function where(arr, num) {
  // Find my place in this sorted array.
  arr.push(num);
  var index =  arr.sort(function(a, b){
    return a-b;
  }).indexOf(num);
  return index;
}
where([40, 60], 50);

// 位移
function rot13(str) { // LBH QVQ VG!
  var ar = str.split('');
  var result;
  var result = ar.map(function(val) {
    if(val.charCodeAt() >= 65 && val.charCodeAt() <=77) {
      val = String.fromCharCode(val.charCodeAt()+13)
    } else if(val.charCodeAt() >= 78 && val.charCodeAt() <=90){
      val = String.fromCharCode(val.charCodeAt()+19)
    }
    return val;
  })
  return result.join('').toUpperCase();
}
// Change the inputs below to test
rot13("SERR PBQR PNZC");
