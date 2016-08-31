// console.log(process.argv[2]);         // 命令行参数，以数组的形式存在
//
// var fs = require('fs');
// fs.readFile('news.txt', function(err, data){
//   if (err) return err;
//   console.log(data.toString());
// })
//
// var buf = new Buffer("jon is here")
// console.log(buf);

// var buf = new Buffer('What you want');
// var json = buf.toJSON(buf);
// console.log(json.data);
// 有时候汉字可能出现乱码，所以可以考虑合并 buffer
var buf1 = new Buffer('菜鸟');
var buf2 = new Buffer('教程');
var buf3 = Buffer.concat(buf1, buf2);
console.log(buf2.toString());
