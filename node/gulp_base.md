gulp只有四个API： task，watch，src，和 dest
```
task这个API用来创建任务，在命令行下可以输入 gulp test 来执行test的任务。
watch这个API用来监听任务。
src这个API设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss, vender.scss]，也可以是正则表达式/**/*.scss。
dest这个API设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本。
```

### 加载插件
```js
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
```

### 建立任务

```js
// Styles任务
gulp.task('styles', function() {
    //编译sass
    return gulp.src('stylesheets/main.scss')
    .pipe(sass())
    //添加前缀
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //保存未压缩文件到我们指定的目录下面
    .pipe(gulp.dest('stylesheets'))
    //给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    //压缩样式文件
    .pipe(minifycss())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('assets'))
    //提醒任务完成
    .pipe(notify({ message: 'Styles task complete' }));
});

// 校验合并压缩
// Scripts任务
gulp.task('scripts', function() {
    //js代码校验
    return gulp.src('javascripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    //js代码合并
    .pipe(concat('all.js'))
    //给文件添加.min后缀
    .pipe(rename({ suffix: '.min' }))
    //压缩脚本文件
    .pipe(uglify())
    //输出压缩文件到指定目录
    .pipe(gulp.dest('assets'))
    //提醒任务完成
    .pipe(notify({ message: 'Scripts task complete' }));
});

// 图片压缩
// Images
gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images');
});

// 事件监听
// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('stylesheets/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('javascripts/*.js', ['scripts']);
  // Watch image files
  gulp.watch('images/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in assets/, reload on change
  gulp.watch(['assets/*']).on('change', livereload.changed);
});
```
###
```
<!-- 单独任务 -->
gulp default
gulp watch

<!-- 整个任务 -->
gulp
```

### 路径建议
```
|--/assets/--------压缩后样式和脚本存放的目录
|--/images/--------图片存放目录
|--/javascripts/---脚本存放目录
|--/stylesheets/---样式存放目录
|--/plugin/--------插件存放目录
|--gulpfile.js
```
