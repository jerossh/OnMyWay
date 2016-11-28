var fs = require('fs');

var readStream = fs.createReadStream('shaonv.mov')
var n = 0

readStream
    .on('data', function(chunk) {
      n++
      console.log('data emits')
      console.log(Buffer.isBuffer(chunk))

      readStream.pause()
      console.log('data pause end')
      readStream.resume()
    })
    .on('readable', function() {
      console.log('data readable')
    })
    .on('end', function() {
      console.log('data ends')
      console.log(n);
    })
    .on('error', function() {
      console.log(err)
    })
