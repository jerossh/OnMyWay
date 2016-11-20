### 现在我只想实现简单的自动化目标

- 修改前端文件的时候浏览器刷新
- 修改后端文件的时候服务器重启

先调用 nodemon 这样 nodemon 会监控项目下所有的 js 文件。这个样子有两个缺点
- 前端 js 文件修改也会引起服务器重启
- 不管是否修改，只要有保存动作就会自动重启服务器
```js
'use strict'

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

//这样写 默认监控项目下所有的js文件
gulp.task('start', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',   // 定义监控的文件格式，目前只需要 js
    ignore:[
            'var/',
            'node_modules/'
    ],  // 不监控的文件
    watch:    [paths.routes, paths.models],   // 和上面 ignore 可以二选一
    env: { 'NODE_ENV': 'development' }   // 设置应用环境
  })
})
```

再来关注下 browsersync 的使用

```js
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// 代理， nodejs开发一般使用代理
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "你的域名或IP"
    });
});
```

所以两个联合起来使用是这样子的

 ```js
 gulp.task('serve', function () {
   nodemon({
     script: 'app.js',
     ext: 'js',   // 定义监控的文件格式，目前只需要 js
     ignore:[
             'var/',
             'node_modules/'
     ],  // 不监控的文件
     watch:    [paths.routes, paths.models],   // 和上面 ignore 可以二选一
     env: { 'NODE_ENV': 'development' }   // 设置应用环境
   })
 })

 gulp.task('start', ['serve'], function() {
   browserSync.init({
       proxy: "你的域名或IP",              // 监控代理地址
       files: ['./public', './views'],   // 监控的文件
       open: true,                       // 是否打开浏览器
       browser: 'google chrome',         // 打开的浏览器名称
       notify: false,                    // 浏览器不现实通知，不知道什么意思
       port: 5000                        // 映射到的地址
   });
 })
 ```

 基本的刷新就完成了
