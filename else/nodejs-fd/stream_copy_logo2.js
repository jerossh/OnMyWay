var fs = require('fs')

var readStream = fs.createReadStream('ra.mp4')
var writeStream =fs.createWriteStream('1-ra-mp4')

readStream.on('data', function(chunk) {
  if(writeStream.write(chunk) === false) {
    console.log('still cached')
    readStream.pause()
  }
})
readStream.on('end', function() {
  writeStream.end()
})

// 写尽了，可以继续读
writeStream.on('drain', function() {
  console.log('data drains')

  readStream.resume()
})
