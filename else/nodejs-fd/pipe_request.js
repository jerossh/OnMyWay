var http = require('http')
var fs = require('fs')

// 如果想抓取网络上的图片需要request模块,本地则不需要
var request = require('request')

http.createServer(function(req, res) {
  // fs.readFile('./logo.png', function(err, data) {
  //   if(err) {
  //     res.end('file note exit!')
  //   }  else {
  //     res.writeHeader(200, {'Context-Type': text/html})
  //     res.end(data)
  //   }
  // })

  // fs.createReadStream('./logo.png').pipe(res)
request('http://img.imooc.com/549bda090001c53e06000338-240-135.jpg').pipe(res)
}).listen(8090)
