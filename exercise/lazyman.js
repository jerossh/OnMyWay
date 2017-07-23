var log = console.log;

function lazyMan (name) {
  return new _lazyMan(name);
}


// 这边应该做成调度中心
function _lazyMan (name) {
  log('hi', name);
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

_lazyMan.prototype.sleep = function (time){
  var _this = this;
  this.tasks.push(function(){
    setTimeout(function(){
      console.log('睡了',time,'分钟');
      _this.next();
    }, time*1000);

  });
  return this;
}

_lazyMan.prototype.eat = function (food){
  var _this = this;
  this.tasks.push(function(){
    log('eat', food);
     _this.next();
  });
  return this;
}

_lazyMan.prototype.sleepFirst = function (time){
  var _this = this;
  this.tasks.unshift(function(){
    setTimeout(function(){
      console.log('先睡了',time,'分钟');
       _this.next();
    }, time*1000);

  });
  return this;
}

lazyMan('hank').eat('apple').sleep(1).eat('melo').sleepFirst(2);
// 总结 巧用 尾调用 和 setTimeout(fucntion(){}, 0) 的特性




// 来个 es 6 方法
const log = console.log;
function lazyMan(name) {
  return new LazyMan(name);
}

class LazyMan {
constructor ( name ) {
        this.tasks = [];//设置任务队列
        let task = (name => () => {
            console.log ( `Hi! This is ${name} !` );
            this.next ();
        }) ( name );
        this.tasks.push ( task );
        //通过settimeout的方法，将执行函数放入下一个事件队列中，从而达到先注册事件，后执行的目的

        setTimeout ( () => {
            this.next ();
        }, 0 );

    }
    //尾调用函数，一个任务执行完然后再调用下一个任务
    next () {
        let task = this.tasks.shift ();
        task && task ();
    }

    eat ( food ) {
        let task = (food => () => {
            console.log ( `Eat ${food}` );
            this.next ();
        }) ( food );
        this.tasks.push ( task );
        return this;
    }

    sleep ( time ) {
        let task = (time => () => {
            setTimeout ( () => {
                console.log ( `Wake up after ${time} s!` );
                this.next ();
            }, time * 1000 )
        }) ( time );
        this.tasks.push ( task );
        return this;
    }

    sleepFirst ( time ) {
        let task = (() => {
            setTimeout ( () => {
                console.log ( `Wake up after ${time} s!` );
                this.next ();
            }, time * 1000 )
        }) ;
        this.tasks.unshift ( task );//sleepFirst函数需要最先执行，所以我们需要在任务队列前面放入，然后再执行后面的任务
        return this;
    }
}

lazyMan('hank').eat('apple').sleep(1).eat('melo').sleepFirst(2);


// 自己写一个 es 6

const lazyMan = function  (name) { // 箭头函数 不能成为构造函数，哈 写前面都不行 啊？
  return new LazyMan(name);
}
const log = console.log
class LazyMan {
  constructor (name) {
    this.tasks = [];
    this.tasks.push(() => {
      console.log('你好，我是'+name);
      this.next();
    });
    setTimeout(()=>{
      this.next()
    }, 0)
  }
  next() {
    const task = this.tasks.shift();
    task && task.call(this)
  }
  eat(food) {
    this.tasks.push(() => {
      log('吃'+food+'了');
      this.next();
    })
    return this;
  }
  sleep (time) {
    this.tasks.push(() => {
      log(time+'分钟后睡醒');
      this.next();
    })
    return this;
  }
  sleepFirst(time) {
    this.tasks.unshift(() => {
      log(time+'分钟后睡醒');
      this.next();
    })
    return this;
  }
}
lazyMan('hank').eat('apple').sleep(1).eat('melo').sleepFirst(2);
