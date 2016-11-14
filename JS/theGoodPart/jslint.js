// ==
// == 会转换
1 == '1'        // true
0 = ''          // true

false == 'false'  // false
false == '0'      // true 难以理解，明明是字符串
false == ''       // true
false == undefined      // false
false == null     // false

null == undefined     // true

'\t' == 0        // true
'\r' == 0       // true
'\n' == 0       // true



// with
with(obj){
  a = b
}
// 等同与某一个条， 太混乱了
a = b;
a = obj.b;
obj.a = b;
obj.a = obj.b;



// eval
// 奇怪的表示法
eval('myValue = myObject.' + myKey + ';')     // 影响阅读，且会让很多优化，工具失效
// 等同于
myvalue = myObject[mykey]
// Function 构造器是 eval 的另一种形式，尽量避免使用
// setTimeout, setInterval 参数也避免使用字符串



// contitue
// 影响性能



// switch
// switch 穿越问题
switch在判断的时候使用的是全等号“===”
var t_keleyi_com = 65;
switch (t_keleyi_com) {
case '65':                    // 格式不相等
alert("字符串65");
break;
}



// 缺少块语句



++ --
// 这个我不赞同



// 位运算符
<< // 这个用取整我倒是经常用



// function 语句 对比 function 表达式
if (false) {
  function f(){
    console.log('done');
  }
}
f()       // Uncaught TypeError: f is not a function(…)
// es 6已经解决了这个问题

if (true) {
  function f(){
    console.log('done');
  }
}
f() // done



// 类型包装对象
new Boolean(false)  //Boolean {[[PrimitiveValue]]: false}
// 完全没必须要，避免使用类型包装
new Boolean
new Number
new String
new Object
new Array



// new



// void
// 是个运算符，返回 undefined
