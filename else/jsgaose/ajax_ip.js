// /**/ typeof JSON_CALLBACK === 'function' && JSON_CALLBACK({
//   "ip": "115.228.49.60",
//   "hostname": "No Hostname",
//   "city": "",
//   "region": "",
//   "country": "CN",
//   "loc": "34.7725,113.7266",
//   "org": "AS4134 No.31,Jin-rong Street"
// });
// //
// function delLocal(res){
//   return res.country;
// }
// //
//
// function getLocal(){
// var xhr = new XMLHttpRequest();
// xhr.onload = function(){
//   if(xhr.status >=200 && xhr.status <300 || xhr.status == 304) {
//     console.log('done');
//     var country = delLocal(xhr.responseText);
//     console.log(country);
//   } else {
//     console.log('false');
//   }
// }
// xhr.open('get', 'http://ipinfo.io/json?callback=JSON_CALLBACK', true);
// xhr.send(null)
//
// }

var xhr = new XMLHttpRequest();
xhr.onload = function(){
  if(xhr.status >=200 && xhr.status <300 || xhr.status == 304) {
    console.log(xhr.responseText);
  } else {
    console.log('false');
  }
}
xhr.open('get', 'http://ipinfo.io/json?callback=JSON_CALLBACK', true);
xhr.send(null)



// 获取国家和ip
// 不用ajax方法，用jonp方法
var lat = 0;
var lon = 0;
var local = document.getElementById('location')
var whether = document.getElementById('whether')
var url = 'http://api.openweathermap.org/data/2.5/weather'


var script = document.createElement('script');
script.src = 'http://ipinfo.io/json?callback=delLocal';
document.body.insertBefore(script, document.body.firstChild)

// api.openweathermap.org/data/2.5/forecast?lat=35&lon=139
// api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test
// api.openweathermap.org/data/2.5/forecast/daily?id=524901&lang=zh_cn
script.onload = function(){
  url = addURLParam(url, 'lat', lat);
  url = addURLParam(url, 'lon', lon);
  url = addURLParam(url, 'callback', 'delWhe');
  url = addURLParam(url, 'appid', '061f24cf3cde2f60644a8240302983f2');
  console.log(url);
  var wheScript = document.createElement('script');
  wheScript.src = url;
  document.body.insertBefore(wheScript, document.body.firstChild)
}

function delWhe(data){
  console.log(data.weather);
  console.log(data.weather[0].main);
  whether.innerHTML = data.weather[0].main
}

// 获取地址和地理位置
function delLocal(res){
  local.innerHTML = res.country;
  var loc = res.loc.split(',');
  // lat = loc[0].split('.')[0];
  // lon = loc[1].split('.')[0];
  lat = loc[0];
  lon = loc[1];
  console.log(lat + ', ' + lon);
}


// url添加参数的函数
function addURLParam(url, name, value) {
  url += (url.indexOf('?') == -1)?'?':'&';
  url += encodeURIComponent(name) + '=' +encodeURIComponent(value)
  return url;
}







navigator.geolocation.getCurrentPosition(function(position) {
  var y = position.coords.latitude;
  var x = position.coords.longitude;
  console.log(x + ', ' + y);
}
)


// 引进新的查询地址的方法
var script = document.createElement('script');
script.src = '//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js';
document.body.insertBefore(script, document.body.firstChild)

script.onload = function(){
  console.log('成功加载');
  var onSuccess = function(location){
    alert(
        "Lookup successful:\n\n"
        + JSON.stringify(location, undefined, 4)
    );
  };

  var onError = function(error){
    alert(
        "Error:\n\n"
        + JSON.stringify(error, undefined, 4)
    );
  };

  geoip2.city(onSuccess, onError);
}



var xhr = new XMLHttpRequest();
xhr.onload = function(){
  if(xhr.status >=200 && xhr.status <300 || xhr.status == 304) {
    console.log(xhr.responseText);
    var patt = /^GeoIP.+China$/m
    patt.test(str)
  } else {
    console.log('false');
  }
}
xhr.open('get', 'http://ip.cn/index.php?ip=115.228.49.60', true);
xhr.send(null)





var str = '<p>GeoIP: Jiaxing, Zhejiang, China</p>'
var patt = /^GeoIP.+China$/m
patt.test(str)
