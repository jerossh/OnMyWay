// 字符的Unicode表示法
// es6之前只能四位数
// es6放入大括号就可以
"\u{20BB7}"  // '吉'

// 有了这种表示法之后，JavaScript共有6种方法可以表示一个字符。
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true


charAt()
charCodeAt()
// 以上都无法正确识别四个字节，要用下面的
var s = '𠮷a';
s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(1).toString(16) // "61"
// 但，第二个位置还是不对，使用for of循环可以解决该问题
var s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// codePointAt 是测试 双字节还是四子节最简单的办法
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
is32Bit("𠮷") // true
is32Bit("a") // false


// ES5提供String.fromCharCode方法
String.fromCharCode(0x20BB7)
// String.fromCharCode不能识别大于0xFFFF的码点
// ES6提供了String.fromCodePoint方法
String.fromCodePoint(x20BB7)


// ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
// 除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
var text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "
for (let i of text) {
  console.log(i);
}
// "𠮷"


// at()
'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"
// 无法识别四子节
'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"



// 欧洲语音语调合成词
'\u01D1'.normalize() === '\u004F\u030C'.normalize()



// 传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。
// ES6又提供了三种新方法。
includes()    // 返回布尔值，表示是否找到了参数字符串。
startsWith()  // 返回布尔值，表示参数字符串是否在源字符串的头部。
endsWith()    // 返回布尔值，表示参数字符串是否在源字符串的尾部。
// 使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。



// repeat()
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
'na'.repeat(2.9) // "nana"
// 如果repeat的参数是负数或者Infinity，会报错。
'na'.repeat(-0.9) // ""    等同于 0
'na'.repeat(NaN) // ""
'na'.repeat('na') // ""



// padStart()，padEnd()
// ES7推出了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart用于头部补全，padEnd用于尾部补全。
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
// 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
// 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
'abc'.padStart(10, '0123456789') // '0123456abc'
// 如果省略第二个参数，则会用空格补全长度。
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

// padStart的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
// 另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"


// 模板字符串，和 jade 很像
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
// 前后是键盘 esc 下面的 点（反引号）
// 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
// 上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
var greeting = `\`Yo\` World!`;
// 模板字符串中嵌入变量，需要将变量名写在${}之中。
${user.name}
// 大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。
var x = 1;
var y = 2;
`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"
`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"
var obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// 3

// 模板字符串之中还能调用函数。
function fn() {
  return "Hello World";
}
`foo ${fn()} bar`
// foo Hello World bar
// 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
// 如果模板字符串中的变量没有声明，将报错。

// 还能嵌套
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
// 上面使用
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];
console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>

// 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"
// 写法二
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack') // "Hello Jack!"



// 实例：模板编译
var template = `
<ul>
  <% for(var i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
// 上面代码在模板字符串之中，放置了一个常规模板。该模板使用<%...%>放置JavaScript代码，使用<%= ... %>输出JavaScript表达式。
// 一种思路是将其转换为JavaScript表达式字符串。
var evalExpr = /<%=(.+?)%>/g;
var expr = /<%([\s\S]+?)%>/g;
template = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');
template = 'echo(`' + template + '`);';

// 然后，将template封装在一个函数里面返回，就可以了。
var script =
`(function parse(data){
  var output = "";
  function echo(html){
    output += html;
  }
  ${ template }
  return output;
})`;
return script;

// 将上面的内容拼装成一个模板编译函数compile。
function compile(template){
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;
  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');
  template = 'echo(`' + template + '`);';
  var script =
  `(function parse(data){
    var output = "";
    function echo(html){
      output += html;
    }
    ${ template }
    return output;
  })`;
  return script;
}
// compile函数的用法如下。
var parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
//   <ul>
//     <li>broom</li>
//     <li>mop</li>
//     <li>cleaner</li>
//   </ul>


// 标签模板
alert`123`
// 等同于
alert(123)
// 但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
var a = 5;
var b = 10;
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

// 函数tag依次会接收到多个参数
function tag(stringArr, value1, value2){
  // ...
}
// 等同于
function tag(stringArr, ...values){
  // ...
}



// String.raw()
// String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"
String.raw`Hi\u000A!`;
// 'Hi\\u000A!
