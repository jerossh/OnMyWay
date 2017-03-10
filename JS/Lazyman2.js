function _LazyMan(name) {
    this.tasks = [];
    var self = this;
    var fn = (function(n) {
        var name = n;
        return function() {
            console.log("hi, " + "I am" + name + '!');
            self.next();
        }
    })(name)
    this.tasks.push(fn);
    setTimeout(function() {
        self.next();
    }, 0); // 第一次调用

}

_LazyMan.prototype.next = function() {
    var fn = this.tasks.shift();
    fn && fn();
}

_LazyMan.prototype.eat = function(food) {
    var self = this;
    var fn = (function(f) {
        var food = f;
        return function() {
            console.log("eat" + food + "~");
            self.next();
        }
    })(food);
    this.tasks.push(fn);
    return this;
}

_LazyMan.prototype.sleep = function(time) {
    var self = this;
    var fn = (function(t) {
        var time = t;
        return function() {
            setTimeout(function() {
                self.next()
            }, time);
        }
    })(time);
    this.tasks.push(fn);
    return this;
}

_LazyMan.prototype.sleepFirst = function(time) {
    var self = this;
    var fn = (function(t) {
        var time = t;
        return function() {
            setTimeout(function() {
                self.next()
            }, time);
        }
    })(time);
    this.tasks.unshift(fn);
    return this;
}

function LazyMan(name) {
    return new _LazyMan(name);
}

LazyMan("hank").sleepFirst(2000).eat('lunch').sleep(1000).eat("dinner");