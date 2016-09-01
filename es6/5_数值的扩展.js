// ES6提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
0b111110111 === 503 // true     二进制
0o767 === 503 // true           八进制


// 2 Number.isFinite(), Number.isNaN()
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

// ES5可以通过下面的代码，部署Number.isFinite方法。
(function (global) {
  var global_isFinite = global.isFinite;
  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
// ES5通过下面的代码，部署Number.isNaN()。
(function (global) {
  var global_isNaN = global.isNaN;
  Object.defineProperty(Number, 'isNaN', {
    value: function isNaN(value) {
      return typeof value === 'number' && global_isNaN(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);


// 它们与传统的全局方法isFinite()和isNaN()的区别在于，
// 传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。


// 4 Number.parseInt(), Number.parseFloat()
// ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45
// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
// 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

// 7 Number.isInteger()
// 需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false

// 5 Number.EPSILON
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// '0.00000000000000022204'

// 6 安全整数和Number.isSafeInteger()
// 超出-2^53到2^53之间 js 无法精确表示
Math.pow(2, 53) === Math.pow(2, 53) + 1    // true
// ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
Number.MAX_SAFE_INTEGER === 9007199254740991
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER === -9007199254740991



// 7 Math对象的扩展
Math.trunc     // trunc 将数字截尾取整
// Math.trunc方法用于去除一个数的小数部分，返回整数部分。
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
Math.trunc('123.456')
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
// es 5模拟
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

Math.sign()      // sign: 符号
// Math.sign方法用来判断一个数到底是正数、负数、还是零。
// 它会返回五种值。
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
Math.sign('foo'); // NaN
Math.sign();      // NaN
// 部署
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};
Math.cbrt()
Math.clz32()
Math.imul()
Math.fround()
Math.hypot()

// 对数方法
Math.expm1()
Math.log1p()
Math.log10()
Math.log2()

// 三角函数方法
Math.sinh(x)         // 返回x的双曲正弦（hyperbolic sine）
Math.cosh(x)         // 返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x)         // 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x)        // 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x)        // 返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x)        // 返回x的反双曲正切（inverse hyperbolic tangent）


// 指数运算符  ES7
