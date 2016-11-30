项目中用到，发现自己虽然学了几遍，还是不甚了解。好好复习一遍

## Stream

*Stream* 模块有四个类，*Readable, Writable, Duplex, Transform*。Transform可以看做自成体系的子类。从使用角度来说，模块定义的类都为基类，是不具备直接使用条件的，需要程序实现相关接口方可使用。

## Stream.Readable

此类需要实现 *_read* 接口，用通俗的话来讲，可读流相当于发货仓库，仓库中的货物储备交由 *_read* 处理，具体发货模块内部自行处理。可读流对象有 *flowing mode，non-flowing mode* 两种模式，前者自动处理发货，后者需要手动控制发货。

```js
// inherit stream.Readable
function Love() {
  stream.Readable.call(this);
  this._max = 5;
  this._index = 0;
}
util.inherits(Love, stream.Readable);

Love.prototype._read = function() {
  var i = this._index++;
  if (i > this._max) {
    this.push('beautiful');
    this.push(null);
  }
  else {
    var str = '' + i;
    var buf = new Buffer(str, 'utf8');
    this.push(buf);
  }
};
```

在初始化时，会自动调用_read方法，利用ctx.push方法写入内容到内部存储buffer（进货）。代码很简单，传输的内容为0-5，以及单词beautiful。现在仓库中已经有货物，然后处理发货流程。

在flowing mode下，监听data事件即可，non-flowing mode下，使用readable.read方法获取内容，两种方式实际效果等同。此处readable事件触发比较不解，暂时无法深入。

```js
// flowing mode
title.on('data', function(data) {
  writer.write(data);
});
// non-flowing mode
title.on('readable', function() {
  var chunk;
  while (null !== (chunk = title.read())) {
    writer.write(chunk);
  }
});
```

## stream.Writable

此类需要实现_write接口，用通俗的话来讲，可写流就是快递签收的过程。卖家不断发货，买家不断收货，签收的流程就是由_write接口定义。

```js
// inherit stream.Writable
function Story() {
  stream.Writable.call(this);
  this._storage = new Buffer('');
}
util.inherits(Story, stream.Writable);

Story.prototype._write = function(chunk, encoding, callback) {
  this._storage = Buffer.concat([this._storage, chunk]);
  callback();
};
```

此处定义方式很简单，收到数据后，将数据保存在 *his._storage* 私有变量中，这样就定义好可写流。下面来看如何综合使用两个类。

```js
var reader = new Love();
var writer = new Story();

reader.on('readable', function() {
  var chunk;
  while (null !== (chunk = title.read())) {
    writer.write(chunk);
  }
});

reader.on('end', function() {
  writer.end();
});

writer.on('finish', function() {
  fs.writeFileSync('./output.txt', this._storage);
});
```

此处使用，将可读流传下来的数据全部写入output.txt文件之中，非常简单的示例。

## stream.Transform
```js
function Knight() {
  stream.Transform.call(this);
}
util.inherits(Knight, stream.Transform);

Knight.prototype._transform = function(chunk, encoding, callback) {
  this.push(chunk);
  callback();
};

Knight.prototype._flush = function(callback) {
  this.push('dark knight');
  callback();
};
```

[相关栗子](http://snowykiss.qiniudn.com/stream.js)
