const filterFn = require('./filter.js');
var dir = process.argv[2]
var filterStr = process.argv[3]

filterFn(dir, filterStr, function(err, list) {
  if(err) console.error('There was a error' + err);
  list.forEach(function(file) {
    console.log(file);
  })
})
