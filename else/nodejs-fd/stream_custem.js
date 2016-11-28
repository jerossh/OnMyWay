var stream = require('stream')
var util = require('util')


// 可读流方法扩展
function ReadStream() {
  stream.Readable.call(this)
}
util.inherits(ReadStream, stream.Readable)

ReadStream.prototype._read = function() {
  this.push('I ')
  this.push('Love ')
  this.push('Lu ')
  this.push(null)
}

// 可写流扩展
function WriteStream() {
  stream.Writable.call(this)
  this._cached = new Buffer('')  //这是干嘛？
}
util.inherits(WriteStream, stream.Writable)

WriteStream.prototype._write = function(chunk, encode, cb) {
  console.log(chunk.toString())
  cb()
}

// 可写转换流扩展
function TransformStream() {
  stream.Transform.call(this)
}
util.inherits(TransformStream, stream.Transform)

TransformStream.prototype._transform = function(chunk, encode, cb) {
  this.push(chunk)
  cb()
}

TransformStream.prototype._flush = function(cb) {
  this.push('~~~~~~')
  this.push('Oh yeah!')
  cb()
}

var rs = new ReadStream()
var ws = new WriteStream()
var ts = new TransformStream()

// 这里调用了之后会自动执行这些自定义的方法？
rs.pipe(ts).pipe(ws)
