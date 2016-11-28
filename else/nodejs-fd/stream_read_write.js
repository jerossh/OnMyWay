var Readable = require('stream').Readable
var Writable = require('stream').WSritable


// 这次的readStream不一样
var readStream = new Readable()
var writeStream = new SWritable()

readStream.push('I ')
readStream.push('Love ')
readStream.push('Lu ')
readStream.push(null)

// 这是 _write 是什么意思
writeStream._write = function(chunk, encode, cb) {
  console.log(chunk.toString())
  cb()
}

readStream.pipe(writeStream)
