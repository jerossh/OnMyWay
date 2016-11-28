var fs = require('fs')

fs.readFile('logo.png', function(err, origin_buffer) {
  console.log(Buffer.isBuffer(origin_buffer))

  fs.writeFile('logo_buffer.png', origin_buffer, function(err) {
    if(err) console.log(err)
  })

  var base64Image = origin_buffer.toString('base64')
  console.log(base64Image)
})
