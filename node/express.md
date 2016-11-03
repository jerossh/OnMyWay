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
