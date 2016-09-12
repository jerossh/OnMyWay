
// err 迷思
var add = function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    }
  }
  return a + b;
}
// throw 会抛出一个 exception 对象。包含 name 和 message
// 该 exception 对象会被传递入一个 try 语句的 catch 从句


// 扩充类型的功能
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
  console.log(this);
};
Number.method('integer', function() {
  return Math[this<0?'ceil':'floor'](this);
});
// 去头尾空白（es5已经有trim）
