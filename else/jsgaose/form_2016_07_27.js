// HTML 自己独特的事件与方法
acceptCharse    // 服务器能够处理的字符集  ????
action          // 接受请求的URL  ????
elements        // 表单中所有空间的集合
enctype         // 请求编码的类型  ????
method          // 要发送的HTTP请求类型
name            // 表单的名称
length          // 表单空间数量
reset()         // 重置表单
submit()         // 提交表单
target          // 用于发送请求和接受响应的窗口名称  ????

// 提交表单
type = 'submit'    // input, buttton
//提交了
var form = document.getElementById('myform');
form.submit()
// 为了防止重复提交表单，最后提交后处理一下提交按钮
// 重置
form.reset()
// 可以在必要的时候取消提交和重置事件，提交： submit；重置：reset；
form.addEventListener('submit', function(e) {
  //如果没有达成
  e.preventDefault();
});

// 表单字段
var form = document.getElementById('myform');
var field1 = form.elements[0];
var fieldText = form.elements['textbox1'];          // 叫textbox1的字段
var fieldCount = form.elements.length;              // 字段数量
// 有 name 的话，返回一个 这个名字的 NodeList
var fieldText = form.elements['textbox1'];
fieldText.length == 3                               // 三个叫做textbox1 的字段

// 表单的字段的属性
disabled
form                // 当前表单指针
name
readOnly            // 布尔，表示是否只读
tabIndex            // tab键切换顺序
type
value

var form = document.getElementById('zh-top-search-form');
var field1 = form.elements[0];
field1.name;                                        // 为什么叫 type？ 不是用来id的？
var field2 = form.elements['q'];
field2.disabled = true;
// HTML5 为表单添加了 autofocus 属性
if (element.autofocus != true) {
    element.focus();
}
// 共有的飙到字段事件
blur
change            // input textarea, 在失去焦点时候触发， select 改变选项时候
focus

// 文本框
input         //size, value, maxlength
area           //row, col 初始值需要放在标签之间  <textarea>初始值</textarea>
field2.select();                                     // 聚焦并选中文本
// 还有一个 select 事件
field2.addEventListener('select', function(){alert('You did it');}, false);
// select 有两个属性， selecttionStart, selecttionEnd
var form = document.getElementById('zh-top-search-form');
var field2 = form.elements['q'];
function getSelectedValue(textbox) {
  return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
}
// 所以我们就可以得到用户选择的东西啦
field2.addEventListener('select', function(){
  console.log('You select '+ getSelectedValue(this));
}, false);
// 这个还支持一个setSelectionRange() ，使用方式与 substring 类似

// 复习一下charCode 属性,只有 keypress事件才有
var EvetnUtil = {
  getCharCode: function(e) {
    if (typeof event.charCode == 'number') {
      return event.charCode;
    } else {                                      // IE8在keyCode中保存ascii编码
      return event.keyCode;
    }
  }
};
// 输入过滤
field2.addEventListener('keypress', function(e){
  var target = e.target;
  var charCode = e.charCode;
  if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !e.ctrlKey) {      // charCode > 9 排除那些 方向键等等的使用
    e.preventDefault();
  }
}, false)

// 操作剪切版
// 6个剪切版事件：beforecopy, copy, beforecut, cut, beforepaste, paste
// 跳过，目前基本用不到

// 自动切换焦点
(function(){
  function tabForward(event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    if(target.value.length == target.maxlength){             // value, size, maxlength都可以拿过来用
      var form = target.form;                                // target是这么用的？ form是指针？
      for (var i = 0; len =form.elements.length; i<len; i++) {
        if (form.elements[i] = target) {
          if(form.elements[i+1]) {
            form.elements[i+1].focus();
          }
        }
      }
    }
  }

  var textbox1 = document.getElementsByClassName('tex1');
  var textbox1 = document.getElementsByClassName('tex2');
  textbox1.addEventListener('keyup', tabForward, false);
  textbox2.addEventListener('keyup', tabForward, false);
})()

// HTML5 约束验证API
// required
var form = document.getElementById('zh-top-search-form');
var field2 = form.elements['q'];
field2.required                                               // false
// 检测是否支持 required
var isRequiredSupported = 'required' in document.createElement('input');
console.log(isRequiredSupported);                             // chrome: true
// 检测是否支持新的类型
var input = document.createElement('input');
input.type = 'email';
var isSupportedEmail  = (input.type == 'email');              // 不支持的会变成text
console.log(isSupportedEmail);
// HTML5 新增的各式： url, email 这两种支持比较好
// number,range, datetime, datetime-local, date, month, week, time 这几种支持不好
// 还有min, max, step 属性 和 input.step(), input.stepDown()  方法


// 输入模式
// pattern 属性，无法阻止用户输入，但是可以用来判定用户输入是否有效
var pattern = document.forms[0].elements[0].pattern        //form  缺了s，记得
// 检测有效性，配合 required 和 pattern 使用, checkValidity方法
document.forms[0].elements[0].checkValidity();
// 检测整个表单，可以循环检测表单是否正确，正确了就可以提交～～；或者提交的时候检测，阻止提交成功
document.forms[0].checkValidity();
// 相比于checkValidity()， validity属性会高数你字段为什么有效或者无效
var input =document.getElementsByTagName('input')[0];
if (input.validity && !input.validity.valid) {
  if(input.validity.valueMissing) {
    console.log('missing');
  } else {
    console.log('invalid');
  }
}
// 只能验证一个input，不实用…
// 禁用验证
novalidate

// 选择框脚本
// 用到在看，实在复杂



// P438
// 富文本编辑，好难
// contenteditable， 让任何的文字元素可以编辑


// 总结
// 跳过了剪切版和富文本编辑
