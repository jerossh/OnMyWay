var fs = require('fs')

fs.createReadStream('ra.mp4').pipe(fs.createWriteStream('2-ra.mp4'))
