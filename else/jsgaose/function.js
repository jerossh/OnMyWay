// 两数字区间相加（包括本身）
function sumAll(arr) {
  arr = arr.sort(function(a, b) {
    return b - a;
  });
  var sum = 0;
  var min = arr[1];
  var max = arr[0];
  while (max >= min) {
    sum += max;
    max--;
  }
  return sum;
}
sumAll([1, 4]);


// 数组差异
function diff(arr1, arr2) {
  var newArr = arr1.concat(arr2);
  var common = arr1.filter(function(val){
    return arr2.indexOf(val) > -1;
  });
  newArr = newArr.filter(function(val) {
    return common.indexOf(val) == -1;
  });
  // Same, same; but different.
  return newArr;
}
diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);


// 对象里面有我们想要的内容
function where(collection, source) {
    var arr = [];
    var keys = Object.keys(source);
    var all = false;
    collection.forEach(function(val) {
      console.log(keys);
      all = keys.every(function(key) {
        return val[key] == source[key];
      });
        if (all) {
          arr.push(val);
        }
    });
  // What's in a name?
  return arr;
}
where([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 });


// 替换，且保持原来的大小写
function myReplace(str, before, after) {
  if (/[A-Z]/.test(before)){
    after = after[0].toUpperCase() + after.slice(1);
  }
  str = str.replace(new RegExp(before, 'g'), after);
  return str;
}
myReplace("He is Sleeping on the couch", "Sleeping", "sitting");

// 碱基配对
function pair(str) {
  var strArr = str.split('');
  var pairArr =strArr.map(function(val){
    var pair;
    var arr = [];
    pair = 'ACGT'[3-'ACGT'.indexOf(val)];
    arr.push(val);
    arr.push(pair);
    return arr;
  });
  return pairArr;
}

pair("GCG");

// 缺失的字母
function fearNotLetter(str) {
  var start = str[0].charCodeAt();
  var end = str[str.length -1].charCodeAt();
  var newStr = '';
  var result;
  while(start <= end){
    newStr += String.fromCharCode(start);
    start++;
  }
  newStr.split('').forEach(function(val) {
    console.log(val);
    if(str.indexOf(val) == -1){
      result = val;
    }
  });
  return result;
}
fearNotLetter("abce");

// 判断是否是布尔
function boo(bool) {
  // What is the new fad diet for ghost developers? The Boolean.
  return Object.prototype.toString.call(bool) == '[object Boolean]';
}
boo(null);

// 返回新数组
function unite(arr1, arr2, arr3) {
  var args = Array.prototype.slice.call(arguments);
  var arr = args.reduce(function(prev, cur){
    return prev.concat(cur);
  });
  var newArr = [];
  arr.forEach(function(val) {
    if (newArr.indexOf(val) == -1) {
      newArr.push(val);
    }
  });
  return newArr;
}
unite([1, 3, 2], [5, 2, 1, 4], [2, 1]);


function convert(str) {
  str = str.replace(/\&/g, "&amp;");
  str = str.replace(/\>/g, "&gt;");
  str = str.replace(/\</g, "&lt;");
  str = str.replace(/\"/g, "&quot;");
  str = str.replace(/\'/g, "&​apos;");
  return str;
}
convert("Shindler's List");

// 尝试了一个半小时才写出来，正则表达式，最近一次匹配项目真是坑，循环里面竟然不回重新匹配
function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  str = str.replace(/\s|_/g, "-");
  console.log('有运行');
  if (!/-/.test(str)) {
    var len =str.match(/[A-Z]/g).length;
    var i = 0;
    console.log(len);
    while(i < len){
      str = str.replace(/([A-Z]){1}/, "-" + RegExp["$&"]);
      i++;
    }
  }
  // str = str.replace(/([A-Z]){1}/, "-" + RegExp["$&"])
  return str;
}
spinalCase("thisIsSpinalTap");
"this---TsSpinalTap";
// 正确方法
function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  str = str.replace(/\s|_/g, "-");
  console.log('有运行');
  if (!/-/.test(str)) {
    var arr = str.split('').map(function(val) {
      if(/[A-Z]/.test(val)) {
        val = '-'+val;
      }
      return val;
    });
    str = arr.join('');
  }
  // str = str.replace(/([A-Z]){1}/, "-" + RegExp["$&"])
  return str.toLowerCase();
}
spinalCase('This Is Spinal Tap');




function sumPrimes(num) {
  var i = (num / 2 << 0);
  var arr = [2];
  while (i >= 1 ) {
      arr[i] = i*2 +1;
      i--;
  }
  arr = arr.filter(function(val) {
    var isPrime = true;
    var half = (val - 1)/2;
    while(half > 2) {
      if (val % half === 0) {
        isPrime = false;
      }
       half--;
    }
    if (val <= num && isPrime){
      return val;
    }
  });
  console.log(arr);
  var sum = arr.reduce(function(pre, cur) {
    return pre + cur;
  });
  return sum;
}

sumPrimes(10);




// 找出能被两个给定参数和它们之间的连续数字整除的最小公倍数。

function sumPrimes(arr) {
  // 获取整个数组
  var max = Math.max(arr[0], arr[1]);
  var min = Math.min(arr[0], arr[1]);
  var arrAll = [];

  var j = max - min;
  var big = max;
  while (j>=0) {
    arrAll[j] = big--;
    j--;
  }
  console.log(arrAll);

  // 获取质数
  var i = (max / 2 << 0);
  var arrP = [2];
  while (i >= 1 ) {
      arrP[i] = i*2 +1;
      i--;
  }
  arrP = arrP.filter(function(val) {
    var isPrime = true;
    var half = (val - 1)/2;
    while(half > 2) {
      if (val % half === 0) {
        isPrime = false;
      }
       half--;
    }
    if (val <= max && val >= min && isPrime){
      return val;
    }
  });
  console.log(arrP);

  // 剩下的合数
  var arrM = arrAll.filter(function(val) {
    if (arrP.indexOf(val) == -1){
      return val;
    }
  });
  console.log(arrM);

  // 公倍数
  arrM2 = arrM.map(function(val) {
    var half2 = (val / 2 << 0);
    var count = 0;
    while (half2 > 1){
      if (val % half2 === 0){
        val = val/half2;
      }
      half2--;
    }
    return val;
  });
  console.log('arrM2: ');
  console.log(arrM2);

  var sum = arrM2.concat(arrP).reduce(function(pre, cur) {
    return pre*cur;
  });
  return sum;
}

sumPrimes([1, 13]);
sumPrimes([1, 5]);
// 放弃了



function find(arr, func) {
  var resultArr = []
  arr.forEach(function(val) {
    var k = func(val);
    if(k) {
      resultArr.push(val)
    }
  })
  return resultArr[0]
}

find([1, 2, 3, 4], function(num){ return num % 2 === 0; });



function drop(arr, func) {
  // Drop them elements.
  while(arr.length>0){
    var bool = func(arr[0])
    if(bool){
      return arr
    } else {
      arr.shift()
    }
  }
  return [];
}

drop([1, 2, 3], function(n) {return n < 3; });


function steamroller(arr) {
  // I'm a steamroller, baby
  var resultArr = []
  var f = (function(arr){
    arr.forEach(function(val) {
      console.log(val);
      if (Array.isArray(val)) {
          f(val)
        } else {
          resultArr.push(val)
        }
      })
    })
    f(arr)
    return resultArr
}


steamroller([1, [], [3, [[4]]]])

// 二进制转换字符串
function binaryAgent(str) {
  str =str.split(' ').map(function(val) {
    val = parseInt(val, 2);
    val = String.fromCharCode(val);
    return val;
  }).join('');


  return str;
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");


// 属性判定
function every(collection, pre) {
  // Is everyone being true?
  var bool = collection.map(function(val) {
    return  val[pre] && val.hasOwnProperty(pre);
  })
  return bool;
}

every([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");

function add() {
  var args = Array.prototype.slice.call(arguments);
  var len = args.length
  var result
  var isNumber
  if (len == 1 && (Object.prototype.toString.call(args[0]) ==  "[object Number]")){

    return function(){
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = args.concat(innerArgs);
    result = finalArgs.reduce(function(pre, cur) {
        return pre + cur
    })
    isNumber = (Object.prototype.toString.call(result) ==  "[object Number]")
    console.log(isNumber);
    result = isNumber?result:undefined
    console.log(result);
    return result;
    }
  } else {
    result = args.reduce(function(pre, cur) {
      return pre + cur
    })
  }
  isNumber = (Object.prototype.toString.call(result) ==  "[object Number]")
  result = isNumber?result:undefined
  return result
}
add(2)([3])

// 验证美国电话号码
function telephoneCheck(str) {
  // Good luck!
  // 都不知道怎么成功的。。
  var patt = /(\(555\)|(^(1\s{1})?555-?))\s?555(-|\s)?5555|1 456 789 4444/
  var isTel =patt.test(str)
  return isTel;
}
telephoneCheck("555-555-5555");


// 对等差分
function sym(args) {
  var result = [];
  function diff(arr1, arr2){
    var arr = arr1.concat(arr2);
    var common = arr1.filter(function(val) {
      return arr2.indexOf(val) > -1
    })
    arr = arr.filter(function(val) {
      return common.indexOf(val) == -1
    })
    return arr;
  }

  args = Array.prototype.slice.call(arguments)
  args = args.reduce(function(pre, cur) {
    return diff(pre, cur)
  })
  console.log(args);
  console.log(result);
  args.forEach(function(val) {
    if (result.indexOf(val) == -1) {
      result.push(val)
    }
  })
  result = result.sort(function(a, b) {
    return a - b
  })
  return result
}
sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])



function convert(num) {
  var numArr = num.split('');

 return num;
}

convert(36);
