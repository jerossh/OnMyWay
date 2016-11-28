function addURLParam(url, name, value) {
  url += (url.indexOf('?')==-1)?"?":"&";
  url += encodeURIComponent(name)+'='+encodeURIComponent(value);
  return url;
}
var xhr = new XMLHttpRequest();
var keyword = encodeURIComponent('天才');
xhr.onload = function(data) {
  console.log(data);
};

xhr.open('get', 'http://apis.baidu.com/avatardata/mingrenmingyan/lookup', true);
xhr.setRequestHeader('dtype', 'JSON');
xhr.setRequestHeader('keyword', keyword);
xhr.setRequestHeader('apikey', 'e9f8168f04238e0b4e1fb4491c66825a');
xhr.send(null);

// 第二种
function addURLParam(url, name, value) {
  url += (url.indexOf('?')==-1)?"?":"&";
  url += encodeURIComponent(name)+'='+encodeURIComponent(value);
  return url;
}
function ProgressEvent(data) {
  data = JSON.parse(data);
  console.log(data.total);
}
var xhr = new XMLHttpRequest();
var url = 'http://apis.baidu.com/avatardata/mingrenmingyan/lookup';
url = addURLParam(url, 'dtype', 'JSON');
url = addURLParam(url, 'keyword', '天才');
url = addURLParam(url, 'page', 1);
url = addURLParam(url, 'rows', 20);
console.log(url);
xhr.onload = function(data) {
  console.log(xhr.status);
  ProgressEvent(data)
};

xhr.open('get', url, true);
xhr.setRequestHeader('apikey', 'e9f8168f04238e0b4e1fb4491c66825a');
xhr.send(null);

// 第三种
function addURLParam(url, name, value) {
  url += (url.indexOf('?')==-1)?"?":"&";
  url += encodeURIComponent(name)+'='+encodeURIComponent(value);
  return url;
}
var xhr = new XMLHttpRequest();
var url = 'http://apis.baidu.com/avatardata/mingrenmingyan/lookup';
url = addURLParam(url, 'dtype', 'JSON');
url = addURLParam(url, 'keyword', '周恩来');
url = addURLParam(url, 'page', 1);
url = addURLParam(url, 'rows', 20);
console.log(url);
xhr.onload = function(r) {
  // console.log(xhr.status);
  // data = JSON.parse(data);
  // console.log(data);
  // console.log(data);
  // console.log('结果:  '+data);
  console.log(r.total);
};

xhr.open('get', url, true);
xhr.setRequestHeader('apikey', 'e9f8168f04238e0b4e1fb4491c66825a');
xhr.send(null);

// 第四种
function addURLParam(url, name, value) {
  url += (url.indexOf('?')==-1)?"?":"&";
  url += encodeURIComponent(name)+'='+encodeURIComponent(value);
  return url;
}
var xhr = new XMLHttpRequest();
var url = 'http://apis.baidu.com/avatardata/mingrenmingyan/lookup';
url = addURLParam(url, 'dtype', 'JSON');
url = addURLParam(url, 'keyword', '周恩来');
url = addURLParam(url, 'page', 1);
url = addURLParam(url, 'rows', 20);
console.log(url);
xhr.onload = function(e) {
  var data = e.target.response;
  data = JSON.parse(data);
  var len = data.total;
  var pos =  Math.floor(Math.random()*len);
  var item = data.result[pos];
  console.log(item);
  var value = data.result[pos].famous_saying;
  console.log(value);
};
xhr.open('get', url, true);
xhr.setRequestHeader('apikey', 'e9f8168f04238e0b4e1fb4491c66825a');
xhr.send(null);


// 开始
var saying = document.getElementById('say_fam');
var name = document.getElementById('name_fam');
var val = document.getElementById('nameInput');
var query = document.getElementById('q');
q.onclick = newSay;
// ajax 事件
function newSay(){
  var xhr = new XMLHttpRequest();
  nameVal = val.value;
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
    var famous_saying = data.result[pos].famous_saying;
    var famous_name = data.result[pos].famous_name;
    saying.innerHTML = famous_saying;
    name.innerHTML = famous_name;
  };
  xhr.open('get', url, true);
  xhr.setRequestHeader('apikey', 'e9f8168f04238e0b4e1fb4491c66825a');
  xhr.send(null);
}
// url查询的作用
function addURLParam(url, name, value) {
  url += (url.indexOf('?')==-1)?"?":"&";
  url += encodeURIComponent(name)+'='+encodeURIComponent(value);
  return url;
}


// 又是新的
var saying = document.getElementById('say_fam');
var name = document.getElementById('name_fam');
var val = document.getElementById('nameInput');
var query = document.getElementById('q');
q.onclick = newSay;
// ajax 事件
function newSay(){
  var xhr = new XMLHttpRequest(),
      value = val.value,
      url = 'http://apis.baidu.com/avatardata/mingrenmingyan/lookup',
      data,
      len,
      pos,
      famus_name,
      famous_saying;

  url = addURLParam(url, 'dtype', 'JSON');
  url = addURLParam(url, 'keyword', value);
  url = addURLParam(url, 'page', 1);
  url = addURLParam(url, 'rows', 20);
  console.log(url);
  xhr.onload = function(e) {
    data = e.target.response;
    data = JSON.parse(data);
    len = data.total;
    pos =  Math.floor(Math.random()*len);
    famous_saying = data.result[pos].famous_saying;
    famus_name = data.result[pos].famous_name;
    name.innerHTML = famus_name;
    saying.innerHTML = famous_saying;
  };
  xhr.open('get', url, true);
  xhr.setRequestHeader('apikey', 'e9f8168f04238e0b4e1fb4491c66825a');
  xhr.send(null);
}
// url查询的作用
function addURLParam(url, name, value) {
  url += (url.indexOf('?')==-1)?"?":"&";
  url += encodeURIComponent(name)+'='+encodeURIComponent(value);
  return url;
}


// 点分享到微博
var shareBtn = document.getElementById('share');
var wbURL = 'http://service.weibo.com/share/share.php'
function share(){
  var localURL = location.origin;
  var content = document.getElementById('say_fam').innerHTML;
  var famousMan = document.getElementById('name_fam').innerHTML;
  var title = content+'  -- '+famousMan;
  wbURL = addURLParam(wbURL,'url',localURL);
  wbURL = addURLParam(wbURL,'title',title);
  window.open(wbURL, 'weibo', "height=650,width=600");
}


sharebtn.onclick = share;

// 键码
document.body.addEventListener('keydown', function(e){
  key = e.charCode || e.keyCode;
  console.log(key);
  if (key == 13) {
    do();
  }
},false)


// change color
var colorW = document.getElementsByClassName('colorful_w');
var colorBk = document.getElementsByClassName('colorful')[0];
var color = function(){
  return "hsb(" + Math.random() + ",1,1)";
};
var len = 0;
function changeColor(val) {
  len = colorW.length;
  for(var i=0;i<len;i++) {
    colorW[i].style.color = val;
  }
  colorBk.style.backgroundColor = val;
}
var colorVal = color();
changeColor(color);


var colorBk = document.getElementsByClassName('colorful')[0];
var color = function(){
  return "hsl(" + Math.floor(Math.random()*360)+ ",38%,56%)";
};
var colorVal = color();
console.log(colorVal);
colorBk.style.backgroundColor = colorVal;
