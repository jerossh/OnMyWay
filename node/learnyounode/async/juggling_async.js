const http = require('http');
const bl = require('bl');
var result = [];
var cout = 0;

function printResult() {
  for (vari =0; i<3, i++) {
    console.log(result[i]);
  }
}

function httpget(index) {
  http.get(process.argv[2+index], function(res) {
    res.pipe(bl(function(err, data){
      if(err) console.error(err);

      result[index] = data.toString();
      cout++

      if(count == 3) {
        printResult()
      }
    }))
  })
}

for(var i=0;i<3;i++) {
  httpget(i)
}
