function _LazyMan(name) {
    this.tasks = [];
    var self = this;
    var fn = (function(n) {
        var name = n;
        return function() {
            console.log("hi! This is" + name + "!");
            self.next();
        }
    })(name);
    this.tasks.push(fn);
    setTimeout(function() {
        self.next();
    }, 0); // 下一个事件循环中启动任务
}

// 事件调度函数
_LazyMan.prototype.next = function() {
    var fn = this.tasks.shift();
    fn && fn();
}

_LazyMan.prototype.eat = function(name) {
    var self = this;
    var fn = (function(name) {
        return function() {
            console.log("Eat" + name + "~");
            self.next();
        }
    })(name);
    this.tasks.push(fn);
    console.log(this.tasks);
    return this; // 链式调用
}

_LazyMan.prototype.sleep = function(time) {
    var self = this;
    var fn = (function(time) {
        return function() {
            setTimeout(function() {
                console.log("Wake up after" + time + " s!");
                self.next();
            }, 1000 * time);
        }
    })(time);
    this.tasks.push(fn);
    return this;
}

_LazyMan.prototype.sleepFirst = function(time) {
    var self = this;
    var fn = (function() {
        return function() {
            setTimeout(function() {
                console.log("Wake up after " + time + " s!");
                self.next();
            }, time * 1000);
        }
    });
    // 放到最前面
    this.tasks.unshift(fn);
    return this;
}

// 封装
function LazyMan(name) {
    return new _LazyMan(name);
}

LazyMan("hank").sleep(10).eat("dinner")