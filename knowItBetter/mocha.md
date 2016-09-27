[demo](https://github.com/ruanyf/mocha-demos)

## 测试脚本的写法

通常，测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）。比如，add.js的测试脚本名字就是add.test.js。

```js
// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

上面这段代码，就是测试脚本，它可以独立执行。测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。

describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。

it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。


## 断言库的用法

```js
expect(add(1, 1)).to.be.equal(2);
```

所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。上面这句断言的意思是，调用add(1, 1)，结果应该等于2。

expect断言的优点是很接近自然语言，下面是一些例子。

```js
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```

## Mocha的基本用法

加上--recursive参数，这时test子目录下面所有的测试用例----不管在哪一层----都会执行。
```
$ mocha --recursive

  加法函数的测试
    ✓ 1 加 1 应该等于 2
    ✓ 任何数加0应该等于自身

  乘法函数的测试
    ✓ 1 乘 1 应该等于 1

  3 passing (9ms)
  ```


## 通配符

```
$ mocha spec/{my,awesome}.js
$ mocha test/unit/*.js
```

上面的第一行命令，指定执行spec目录下面的my.js和awesome.js。第二行命令，指定执行test/unit目录下面的所有js文件。

除了使用Shell通配符，还可以使用Node通配符。

```
$ mocha 'test/**/*.@(js|jsx)'
```

## 命令行参数

#### 6.1 --help, -h

#### 6.2 --reporter, -R

--reporter参数用来指定测试报告的格式，默认是spec格式。

使用 **mochawesome** 模块，可以生成漂亮的HTML格式的报告。


#### 6.3 --growl, -G

打开--growl参数，就会将测试结果在桌面显示。

#### 6.4 --watch，-w
--watch参数用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha。

#### 6.5 --bail, -b

--bail参数指定只要有一个测试用例没有通过，就停止执行后面的测试用例。这对持续集成很有用

#### 6.6 --grep, -g

--grep参数用于搜索测试用例的名称（即it块的第一个参数），然后只执行匹配的测试用例。
```
$ mocha --grep "1 加 1"
```

#### 6.7 --invert, -i

--invert参数表示只运行不符合条件的测试脚本，必须与--grep参数配合使用。

## 七，配置文件mocha.opts

Mocha允许在test目录下面，放置配置文件mocha.opts，把命令行参数写在里面。请先进入demo03目录，运行下面的命令。
```
$ mocha --recursive --reporter tap --growl
```
上面这个命令有三个参数--recursive、--reporter tap、--growl。
然后，把这三个参数写入test目录下的mocha.opts文件。

```
--reporter tap
--recursive
--growl
```
然后，执行mocha就能取得与第一行命令一样的效果。

如果测试用例不是存放在test子目录，可以在mocha.opts写入以下内容。
```
server-tests
--recursive
```

## 八、ES6测试

如果测试脚本是用ES6写的，那么运行测试之前，需要先用Babel转码。进入demo04目录，打开test/add.test.js文件，可以看到这个测试用例是用ES6写的。

```js
import add from '../src/add.js';
import chai from 'chai';

let expect = chai.expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

ES6转码，需要安装Babel。
```
$ npm install babel-core babel-preset-es2015 --save-dev
```
然后，在项目目录下面，新建一个.babelrc配置文件。
```
{
  "presets": [ "es2015" ]
}
```
最后，使用--compilers参数指定测试脚本的转码器。
```
$ ../node_modules/mocha/bin/mocha --compilers js:babel-core/register
```


## 九、异步测试

Mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错。对于涉及异步操作的测试用例，这个时间往往是不够的，需要用-t或--timeout参数指定超时门槛。

```js
it('测试应该5000毫秒后结束', function(done) {
  var x = true;
  var f = function() {
    x = false;
    expect(x).to.be.not.ok;
    done(); // 通知Mocha测试结束
  };
  setTimeout(f, 4000);
});
```
```
$ mocha -t 5000 timeout.test.js
```

另外，上面的测试用例里面，有一个done函数。it块执行的时候，传入一个done参数，当测试结束的时候，必须显式调用这个函数，告诉Mocha测试结束了。否则，Mocha就无法知道，测试是否结束，会一直等到超时报错。你可以把这行删除试试看。

Mocha默认会高亮显示超过75毫秒的测试用例，可以用-s或--slow调整这个参数。
```
$ mocha -t 5000 -s 1000 timeout.test.js
```

下面是另外一个异步测试的例子async.test.js。
```js
it('异步请求应该返回一个对象', function(done){
  request
    .get('https://api.github.com')
    .end(function(err, res){
      expect(res).to.be.an('object');
      done();
    });
});
```
运行下面命令，可以看到这个测试会通过。
```
$ mocha -t 10000 async.test.js
```
另外，Mocha内置对Promise的支持，允许直接返回Promise，等到它的状态改变，再执行断言，而不用显式调用done方法。请看promise.test.js。

```js
it('异步请求应该返回一个对象', function() {
  return fetch('https://api.github.com')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).to.be.an('object');
    });
});
```

## 十、测试用例的钩子

Mocha在describe块之中，提供测试用例的四个钩子：before()、after()、beforeEach()和afterEach()。它们会在指定时间执行。

```js
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```

进入demo06子目录，可以看到下面两个例子。首先是beforeEach的例子beforeEach.test.js。
```js
// beforeEach.test.js
describe('beforeEach示例', function() {
  var foo = false;

  beforeEach(function() {
    foo = true;
  });

  it('修改全局变量应该成功', function() {
    expect(foo).to.be.equal(true);
  });
});
```

另一个例子beforeEach-async.test.js则是演示，如何在beforeEach之中使用异步操作。
```js

// beforeEach-async.test.js
describe('异步 beforeEach 示例', function() {
  var foo = false;

  beforeEach(function(done) {
    setTimeout(function() {
      foo = true;
      done();
    }, 50);
  });

  it('全局变量异步修改应该成功', function() {
    expect(foo).to.be.equal(true);
  });
});
```

## 十一、测试用例管理

大型项目有很多测试用例。有时，我们希望只运行其中的几个，这时可以用only方法。

describe块和it块都允许调用only方法，表示只运行某个测试套件或测试用例。

```js
it.only('1 加 1 应该等于 2', function() {
  expect(add(1, 1)).to.be.equal(2);
});

it('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});
```
上面代码中，只有带有only方法的测试用例会运行。

此外，还有skip方法，表示跳过指定的测试套件或测试用例。

```js
it.skip('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});
```

## 十二、浏览器测试

除了在命令行运行，Mocha还可以在浏览器运行。

首先，使用mocha init命令在指定目录生成初始化文件。

```
$ mocha init demo08
```

运行上面命令，就会在demo08目录下生成index.html文件，以及配套的脚本和样式表。

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Unit.js tests in the browser with Mocha</h1>
    <div id="mocha"></div>
    <script src="mocha.js"></script>
    <script>
      mocha.setup('bdd');
    </script>
    <script src="tests.js"></script>
    <script>
      mocha.run();
    </script>
  </body>
</html>
```

然后，新建一个源码文件add.js。

然后，把这个文件，以及断言库chai.js，加入index.html。

```html
<script>
  mocha.setup('bdd');
</script>
<script src="add.js"></script>
<script src="http://chaijs.com/chai.js"></script>
<script src="tests.js"></script>
<script>
  mocha.run();
</script>
```
最后，在tests.js里面写入测试脚本
```js
var expect = chai.expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });

  it('任何数加0等于自身', function() {
    expect(add(1, 0)).to.be.equal(1);
    expect(add(0, 0)).to.be.equal(0);
  });
});
```

## 十三、生成规格文件

Mocha支持从测试用例生成规格文件。

```
$ mocha --recursive -R markdown > spec.md
```

上面命令根据test目录的所有测试脚本，生成一个规格文件spec.md。-R markdown参数指定规格报告是markdown格式。
如果想生成HTML格式的报告spec.html，使用下面的命令。

```
$ mocha --recursive -R doc > spec.html
```
