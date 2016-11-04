## express()
创建一个 Express 应用。express() 是一个由 express 模块导出的入口（top-level）函数。

```js
var express = require('express');
var app = express();
```

## 内置方法
  express.static(root, [options])
  express.static 是 express 内置的唯一一个中间件

# Application

```js
const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(3000);
```

app 对象 如下有方法：
- 路由htpp请求: app.METHOD 和 app.param
- 配置中间件:app.route
- 渲染 html: app.render
- 注册文本模版: app.engine


## 属性

### app.locals

```js
app.locals.title = 'My App';
```

### app.mountpath   || 看不懂什么意思
```js
const express = require('express');
const app = express();
const admin = express();

admin.get('/', function (req,res) {
  console.log(admin.moutpath);        //   /admin
  res.send('Admin Homepage');
});

app.use('/admin', admin);   // mount the sub app
```

## 事件

app.on

## 方法
```js
app.all()    // 特殊的路由方法，它不属于HTTP协议中的规定的方法。它为一个路径加载中间件，其对所有的请求方法都有效。
app.delete()
app.disabled()
app.enale()
app.enabled()
app.engine()    // 通过 engine 中间件，可以渲染多个格式模板内容
app.get(name)   // app.set('title', value); app.get('title') 全局性质
app.get(path, cb)
app.listen(port, [hostname], [backlog], [callback])   //
```

通过调用express()返回得到的app实际上是一个JavaScript的 **Function**，被设计用来作为一个回调传递给Node HTTP servers来处理请求。
这样，其就可以很简便的基于同一份代码提供http和https版本，所以app没有从这些继承(它只是一个简单的回调)。

```js
const express = require('express');
const https = require('https');
const http = require('http');

http.createServer(app).listen(80);
http.createServer(options, app).listen(443)
```

简单实现：
```js
app.listen = function() {
  const server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

### app.METHOD

**app.all()** 是一个特殊的路由方法，它不属于HTTP协议中的规定的方法。它为一个路径加载中间件，其对所有的请求方法都有效。
```js
app.all('/secret', function (req, res) {
    console.log('Accessing the secret section...');
    next(); // pass control to the next handler
});
```
```js
app.param([name], callback)   //我没看懂这个什么作用
app.path        // const blog = express(); app.use('/blog', blog); console.log(blog.path()); // '/blog'
app.render()    // 作用好像不是很大
app.route(path)
app.set(name, val)   // 有关设置 http 头部信息的好好了解下
app.use(path, cb)    // 可以使用各种中间件
```

# Request
