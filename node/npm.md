## 什么是 npm 脚本？

npm 允许在package.json文件里面，使用scripts字段定义脚本命令。

```js
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

上面代码是package.json文件的一个片段，里面的scripts字段是一个对象。它的每一个属性，对应一段脚本。比如，build命令对应的脚本是node build.js。

命令行下使用npm run命令，就可以执行这段脚本。

```
$ npm run build
# 等同于执行
$ node build.js
```

这些定义在package.json里面的脚本，就称为 npm 脚本。它的优点很多。

- 项目的相关脚本，可以集中在一个地方。
- 不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。用户不需要知道怎么测试你的项目，只要运行npm run test即可。
- 可以利用 npm 提供的很多辅助功能。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的npm run命令。

```
$ npm run
```

## 原理

npm 脚本的原理非常简单。每当执行 **npm run**，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，**npm run** 新建的这个 Shell，会将当前目录的 **node_modules/.bin** 子目录加入 **PATH** 变量，执行结束后，再将PATH变量恢复原样。
<!-- 不懂这句话什么意思 -->

这意味着，当前目录的 **node_modules/.bin** 子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写 **mocha test** 就可以了。

```
"test": "mocha test"
```

而不用写成下面这样。

```
"test": "./node_modules/.bin/mocha test"
```

由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。

npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是 **0**，npm 就认为这个脚本执行失败。
<!-- 退出码是什么意思？ -->

## 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

```
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```
上面代码中，*表示任意文件名，**表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。
```
"test": "tap test/\*.js"
```

## 传参

向 npm 脚本传入参数，要使用--标明。

```
"lint": "jshint **.js"
```
向上面的npm run lint命令传入参数，必须写成下面这样。

```
$ npm run lint --  --reporter checkstyle > checkstyle.xml
```

也可以在package.json里面再封装一个命令。

```
"lint": "jshint **.js",
"lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
```

## 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用&符号。

```
$ npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

```
$ npm run script1.js && npm run script2.js
```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：[script-runner](https://github.com/paulpflug/script-runner)、[npm-run-all](https://github.com/mysticatea/npm-run-all)、[redrun](https://github.com/coderaiser/redrun)。

## 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

```
"start": "node server.js"，
"install": "node-gyp rebuild"
```

上面代码中，**npm run start** 的默认值是 **node server.js**，前提是项目根目录下有 **server.js** 这个脚本；**npm run install** 的默认值是 **node-gyp rebuild**，前提是项目根目录下有 **binding.gyp** 文件。
<!-- binding.gyp 是啥 -->

## 钩子

npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。

```
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行npm run build的时候，会自动按照下面的顺序执行。

```
npm run prebuild && npm run build && npm run postbuild
```

因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子

```
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子。

- republish，postpublish
- preinstall，postinstall
- preuninstall，postuninstall
- preversion，postversion
- pretest，posttest
- prestop，poststop
- prestart，poststart
- prerestart，postrestart

自定义的脚本命令也可以加上 **pre** 和 **post** 钩子。比如，myscript这个脚本命令，也有premyscript和postmyscript钩子。不过，双重的pre和post无效，比如prepretest和postposttest是无效的。

npm 提供一个npm_lifecycle_event变量，返回当前正在运行的脚本名称，比如pretest、test、posttest等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的npm scripts命令编写代码。请看下面的例子。

```js
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
  console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
  console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
  console.log(`Running the posttest task!`);
}
```

## 简写形式

四个常用的 npm 脚本有简写形式。

- npm start是npm run start
- npm stop是npm run stop的简写
- npm test是npm run test的简写
- npm restart是npm run stop && npm run restart && npm run start的简写

npm start、npm stop和npm test都比较好理解，而npm restart是一个复合命令，实际上会执行三个脚本命令：stop、restart、start。具体的执行顺序如下。

1. prerestart
- prestop
- stop
- poststop
- restart
- prestart
- start
- poststart
- postrestart

## 变量
<!-- git bash下以下变量值都有问题 -->

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

首先，通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段。比如，下面是一个package.json。

```js
{
  "name": "foo",
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }

}
```

那么，变量npm_package_name返回foo，变量npm_package_version返回1.2.5。

```js
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量 **process.env** 对象，拿到package.json的字段值。如果是 Bash 脚本，可以用 **$npm_package_name** 和 **$npm_package_version** 取到这两个值。
<!-- git bash 没有效果 -->

```js
"repository": {
  "type": "git",
  "url": "xxx"
},
scripts: {
  "view": "echo $npm_package_repository_type"
}
```

上面代码中，repository字段的type属性，可以通过npm_package_repository_type取到。

下面是另外一个例子。

```js
"scripts": {
  "install": "foo.js"
}
```

上面代码中，npm_package_scripts_install变量的值等于foo.js。

然后，npm 脚本还可以通过 **npm_config_** 前缀，拿到 npm 的配置变量，即 **npm config get xxx** 命令返回的值。比如，当前模块的发行标签，可以通过 **npm_config_tag** 取到。

## 常用脚本示例

```
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
```
