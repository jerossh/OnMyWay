const http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'plain/text'})
  // The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]));
