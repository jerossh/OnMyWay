const net = require('net');

function fillzero(i){
  return (i<0?'0':'') + i
}

function now(){
  var d = new Date();
  return d.getFullYear() + '-'
    + fillzero(d.getMonth()) + '-'
    + fillzero(d.getDate()) + ' '
    + fillzero(d.getHours()) + ':'
    + fillzero(d.getMinutes())
}

var server = net.createServer(function(c) {
  console.log('Client connected');
  c.end(now() +'\n')
  // c.on('end', () =>{               //  有了上面的 end 这个不能用了
  //   console.log('Client disconnected'+ now());
  // })

  // c.write('time')
  // c.pipe(c)       //这一步做什么？传输数据然后接收本地前端处理？
})
server.on('error', (err) => {
  throw err;
});
server.listen(4000, () => {
  console.log('server bound: '  + now());
});
