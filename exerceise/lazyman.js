function lazyMan (name) {
  return new _lazyMan(name);
}

// 这边应该做成调度中心
function _lazyMan (name, callback) {
  console.log('hi', name);
  this.tasks = [];
  // this.tasks.push ( task );
  setTimeout ( () => {
      this.next ();
  }, 0 );
}

// 调度函数
_lazyMan.prototype.next = function () {
  var task = this.tasks.shift ();
  task && task ();
}

_lazyMan.prototype._callback = function () {
  var cbs = []
}

_lazyMan.prototype.sleep = function (time){
  this.tasks.push(function(){
    setTimeout(function(){
      console.log('睡了',time,'分钟');
    }, time*1000);

  });
  return this;
}

lazyMan('hank').sleep(10);


// 总结 巧用 尾调用 和 setTimeout(fucntion(){}, 0) 的特性