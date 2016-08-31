//1 原生node学习笔记
net.createServer(function(socket){})    // 这是主要传输数据的用处？
http.get(path, function(res){})         // 请求百度等等，然后 res里面加工一下



//2 一些中间件的使用
// url
url.parse(req.url, true)    //把解析后对象中 qs，变成对象。false则 qs是文本。

// bl
在pipe中使用 bl(function(err, data){})

// path
path.extname(file)
path.join(__dirname, 'public')

// 自己写的模块的调用+







//3 express学习笔记

// 以下与本本站点无关
app.get('/home', function(req, res) {
  res.render('home', {date: new Date().toDateString()})        // 第一次看到 toDateString
})


// req.body  的释义
// Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))             // extend: true  会怎么样？
// false：用 the querystring library对url进行解析；    true：the qs library进行解析
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for
 // rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. For more information, please see the qs library.

app.post('/form', function(req, res) {
  res.send(req.body.str.split('').reverse().join(''))         // str 是什么。以前了解的是 req.params
})


// MIME: Multipurpose Internet Mail Extensions  MINE的释义
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

// 特殊需要编译的sylus格式css使用方法
app.use(require('stylus').middleware(process.argv[3]));


// crypto 的使用
var express = require('express')
var app = express()

app.put('/message/:id', function(req, res){
  var id = req.params.id
  var str = require('crypto')
    .createHash('sha1')
    .update(new Date().toDateString() + id)
    .digest('hex')
  res.send(str)
})

app.listen(process.argv[2])

// req.query 属性
var express = require('express')
var app = express()

app.get('/search', function(req, res){
  var query = req.query
  res.send(query)
})
app.listen(process.argv[2])


// res.json()，Sends a JSON response. This method is identical to res.send() with an object or array as the parameter
var express = require('express')
var app = express()
var fs = require('fs')
app.get('/books', function(req, res){
  var filename = process.argv[3]
  fs.readFile(filename, function(e, data) {
    if (e) return res.sendStatus(500)
    try {
      books = JSON.parse(data)          // 先尝试解析，最后再发送 res.json ，如果解析不成功， res.sendStatus(500)
    } catch (e) {
      res.sendStatus(500)
    }
    res.json(books)
  })
})

app.listen(process.argv[2])
