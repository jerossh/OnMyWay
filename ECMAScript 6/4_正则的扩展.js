// 1 RegExp构造函数
// 在ES5中
var regex = new RegExp('xyz', 'i');       //  等价于
var regex = /xyz/i;
// 第二种
var regex = new RegExp(/xyz/i);      // 等价于
var regex = /xyz/i;
// 以下爱在es5种是错误的
var regex = new RegExp(/xyz/, 'i');//错误

// ES6改变了这种行为
new RegExp(/abc/ig, 'i').flags
// "i"
// 上面代码中，原有正则对象的修饰符是ig，它会被第二个参数i覆盖。



// 2 字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()和split()。
// ES6将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
String.prototype.match 调用 RegExp.prototype[Symbol.match]
String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
String.prototype.search 调用 RegExp.prototype[Symbol.search]
String.prototype.split 调用 RegExp.prototype[Symbol.split]



// 3 u修饰符
// ES6对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于\uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。
/^\uD83D/u.test('\uD83D\uDC2A')       // 后面是四字节的,所以应该返回错误
// false
/^\uD83D/.test('\uD83D\uDC2A')
// true
// 1）点字符
var s = '𠮷';     // 会觉得是两个两个字符
/^.$/.test(s) // false
/^..$/.test(s) // true
/^.$/u.test(s) // true  这个可以正确处理
// 2）Unicode字符表示法
/\u0061/.test('a') // true
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
// 3）量词
/a{2}/.test('aa') // true
/a{2}/u.test('aa') // true
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
// 另外，只有在使用u修饰符的情况下，Unicode表达式当中的大括号才会被正确解读，否则会被解读为量词。
/^\u{3}$/.test('uuu') // true  被理解为量词而不是 unicode 表达式
// 4）预定义模式
/^\S$/.test('𠮷') // false    还是无法识别四字节
/^\S\S$/.test('𠮷') // true
/^\S$/u.test('𠮷') // true
// 正确的长度，通过正则返回的数组长度
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}
var s = '𠮷𠮷';
s.length // 4
codePointLength(s) // 2
// 5）i修饰符
// \u004B与\u212A都是大写的K。
/[a-z]/i.test('\u212A') // false
/[a-z]/i.test('\u004B') // true
/[a-z]/iu.test('\u212A') // true

// 4 y修饰符
// y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
// 不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]
r1.exec(s) // ["aa"]
r2.exec(s) // null
// 上面代码有两个正则表达式，一个使用g修饰符，另一个使用y修饰符。这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是_aa_a。
// 由于g修饰没有位置要求，所以第二次执行会返回结果，而y修饰符要求匹配必须从头部开始，所以返回null。
var s = 'aaa_aa_a';
var r = /a+_/y;
r.exec(s) // ["aaa_"]
r.exec(s) // ["aa_"]

// 使用lastIndex属性，可以更好地说明y修饰符。
const REGEX = /a/g;
REGEX.lastIndex = 2;
const match = REGEX.exec('xaya');
match.index // 3
REGEX.lastIndex // 4
REGEX.exec('xaxa') // null
// y修饰符同样遵守lastIndex属性，但是要求必须在lastIndex指定的位置发现匹配。
const REGEX = /a/y;
REGEX.lastIndex = 2;
REGEX.exec('xaya') // null
REGEX.lastIndex = 3;
const match = REGEX.exec('xaxa');
match.index // 3
REGEX.lastIndex // 4
// 进一步说，y修饰符号隐含了头部匹配的标志^。
/b/y.exec('aba')
// 在split方法中使用y修饰符，原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。
'x##'.split(/#/y)    // [ 'x##' ]
'##x'.split(/#/y)    // [ '', '', 'x' ]  毛线用啊，都要连着匹配，都是空字符才有

// 下面是字符串对象的replace方法的例子。
const REGEX = /a/gy;
'aaxa'.replace(REGEX, '-') // '--xa'

// 单单一个y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配。
'a1a2a3'.match(/a\d/y) // ["a1"]   有y没也没区别
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]   有y没也没区别，
'a1a232a3'.match(/a\d/gy) //["a1", "a2"]   还是分割一下次啊看得出来


// 5 sticky属性
// 与y修饰符相匹配，ES6的正则对象多了sticky属性，表示是否设置了y修饰符。
var r = /hello\d/y;
r.sticky // true

// 6 flags属性
/abc/ig.source     // "abc"
/abc/ig.flags      // 'gi'


// 7 RegExp.escape()   ES7
// 8 后行断言          ES7
