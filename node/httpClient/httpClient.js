const http = require('http');

// http.createServer(function(req, res) {
//   // 每次会先触发 checkContinue 事件，（100 - continue）,如果没有设置事件监听，server会返回一个自动响应
//   // 处理这个事件的监听程序是
//   res.writeContinue('我收到了')
//   res.writeHead(200, {"Content-Type":"text/plain"})
//   res.write('You did it \n')
//   res.end('Ok')
// }).listen(3000)

http.get(process.argv[2], function(res) {
  console.log('Got response');
  // res.resume()                                                //这是啥？
  res.setEncoding('utf8');
  // res.on('data', console.log)
  res.on('data', function(data){
    console.log(data.length);
    console.log(data);
  })
  res.on('error', console.error)
}).on('error',console.error)
