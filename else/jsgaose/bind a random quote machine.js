// ajax事件申明
var saying = document.getElementById('say_fam');
var fname = document.getElementById('name_fam');
var fval = document.getElementById('nameInput');

// 微博事件变量申明
var wbURL = 'http://service.weibo.com/share/share.php';

// change color
var colorW = document.getElementsByClassName('colorful_w');
var colorBk = document.getElementsByClassName('colorful')[0];

// 点击事件
document.body.addEventListener('click', function(e){
  var tar = e.target;
  switch (tar.id) {
    case 'q':
      newSay();
      break;
    case 'share':
      share();
      break;
  }
},false);

// 键盘事件
fval.addEventListener('keydown', function(e){
  key = e.charCode || e.keyCode;
  if (key == 13) {
    newSay();
  }
},false)

// ajax 事件函数
function newSay(){
  var xhr = new XMLHttpRequest();
  var nameVal = fval.value;
  var url = 'http://apis.baidu.com/avatardata/mingrenmingyan/lookup';
  url = addURLParam(url, 'dtype', 'JSON');
  url = addURLParam(url, 'keyword', nameVal);
  url = addURLParam(url, 'page', 1);
  url = addURLParam(url, 'rows', 20);
  console.log(url);
  xhr.onload = function(e) {
    var data = e.target.response;
    data = JSON.parse(data);
    var pos =  Math.floor(Math.random()*20);
    console.log(pos);
    saying.innerHTML = data.result[pos].famous_saying;
    fname.innerHTML = data.result[pos].famous_name;
  };
  xhr.open('get', url, true);
  xhr.setRequestHeader('apikey', 'e9f8168f04238e0b4e1fb4491c66825a');
  xhr.send(null);

  var color = function(){
    return "hsl(" + Math.floor(Math.random()*360)+ ",38%,56%)";
  }();
  changeColor(color);
}

// 微博按钮事件函数
function share(){
  var localURL = location.origin;
  var title = saying.innerHTML+'  -- '+fname.innerHTML;
  wbURL = addURLParam(wbURL,'url',localURL);
  wbURL = addURLParam(wbURL,'title',title);
  window.open(wbURL, 'weibo', "height=650,width=600");
}

// url查询添加函数
function addURLParam(url, name, value) {
  url += (url.indexOf('?')==-1)?"?":"&";
  url += encodeURIComponent(name)+'='+encodeURIComponent(value);
  return url;
}

// color change 函数
function changeColor(color) {
  var len = colorW.length;
  for(var i=0;i<len;i++) {
    colorW[i].style.color = color;
  }
  colorBk.style.backgroundColor = color;
}
