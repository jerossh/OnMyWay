## intallation

```
$ npm install superagent
```

与 browserify 需要用 webpack

```js

// 这应该是客户端使用
request
  .post('/api/pet')
  .send({ name: 'Manny', species: 'cat' })
  .set('X-API-Key', 'foobar')
  .set('Accept', 'foobar')
  .end(function(err, res) {
    // Calling the end function will send the request
    if (res.ok) {
    alert('yay got ' + JSON.stringify(res.body));
    } else {
    alert('Oh no! error ' + res.text);
    }
  })
```

## 基础请求

一个请求的初始化可以用请求对象里合适的方法来执行，然后调用end()来发送请求,下面是一个简单的get请求
```js
request
  .get('/search')
  .end(function(res){
  });

// 传参形式
request('GET', '/search').end(callback);
```

node 的客户端允许提供绝对路径
```js
request
  .get('http://example.com/search')
  .end(function(res){

  });
```

delete,head,post,put和别的http动作都可以使用,来换个方法看看:
```js
request
  .head('/favicon.ico')
  .end(function(res){

  });
```

delete是一个特列,因为它是系统保留的关键字,所以应该用.del()这个名字:
```js
request
  .del('/user/1')
  .end(function(res){

  });
```

http请求默认的方法为get,所以就像你看到的,下面的这个例子也是可用的:
```js
request('/search', function(res){

 });
```

## 设置头字段

设置头字段非常简单，只需调用.set()方法，传递一个名称和值就行:

```js
request
   .get('/search')
   .set('API-Key', 'foobar')
   .set('Accept', 'application/json')
   .end(callback);

// 你也可以直接传递一个对象进去，这样一次就可以修改多个头字段:
request
  .get('/search')
  .set({ 'API-Key': 'foobar', Accept: 'application/json' })
  .end(callback);
```

## Get请求

当使用get请求传递查询字符串的时候，用.query()方法,传递一个对象就可以,下面的代码将产生一个/search?query=Manny&range=1..5&order=desc请求:

```js
request
  .get('/search')
  .query({ query: 'Manny' })
  .query({ range: '1..5' })
  .query({ order: 'desc' })
  .end(function(res){

  });

// 或者传一个单独的大对象:
request
  .get('/search')
  .query({ query: 'Manny', range: '1..5', order: 'desc' })
  .end(function(res){

  });

// .query()方法也允许传递字符串:
request
    .get('/querystring')
    .query('search=Manny&range=1..5')
    .end(function(res){
    });

// 或者字符串拼接:
request
    .get('/querystring')
    .query('search=Manny')
    .query('range=1..5')
    .end(function(res){

    });
```

## POST/PUT请求
一个典型的json post请求看起来就像下面的那样，设置一个合适的Content-type头字段，然后写入一些数据，在这个例子里只是json字符串:
```js
request.post('/user')
    .set('Content-Type', 'application/json')
    .send('{"name":"tj","pet":"tobi"}')
    .end(callback)
```

因为json非常通用，所以就作为默认的Content-type,下面的例子跟上面的一样:
```js
request.post('/user')
    .send({ name: 'tj', pet: 'tobi' })
    .end(callback)
```

或者调用多次.send()方法:
```js
request.post('/user')
    .send({ name: 'tj' })
    .send({ pet: 'tobi' })
    .end(callback)
```
