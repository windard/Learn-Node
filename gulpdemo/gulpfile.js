var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');//检查js
var concat = require('gulp-concat');//合并js
var uglify = require('gulp-uglify');//uglify 组件（用于压缩 JS）
var rename = require('gulp-rename');//重命名
var minify = require('gulp-minify-css');//压缩css
var htmlmini = require('gulp-minify-html');//压缩html
var imagemin = require('gulp-imagemin');//图片压缩
var jpgmin = require('imagemin-jpeg-recompress');//jpg图片压缩
var pngquant = require('imagemin-pngquant'); //png图片压缩

// 检查js脚本的任务
gulp.task('lint', function() {
    gulp.src('./src/js/*.js') //可配置你需要检查脚本的具体名字。
        .pipe(jshint({loopfunc:true}))
        .pipe(jshint.reporter('default'));
});

// 合并，压缩js文件
// 找到 js/ 目录下的所有 js 文件，压缩，重命名，最后将处理完成的js存放在 dist/js/ 目录下
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(rename(function(path){
            path.basename += ".min";
            path.extname = '.js';
        }))
        .pipe(gulp.dest('./dist/js'));

        console.log('gulp scripts is done');//自定义提醒信息
});

// 压缩 css
gulp.task('css', function () {
    gulp.src('./src/css/*.css')  //要压缩的css
        .pipe(minify())
        .pipe(gulp.dest('./dist/css'));

        console.log('gulp css is done');//自定义提醒信息
});

// 压缩 html
gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('./dist/'));

        console.log('gulp html is done');//自定义提醒信息
})

// 压缩图片
gulp.task('image', function () {
    gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant(), jpgmin()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist/images/'));

        console.log("gulp image is done");
});

//.... // 其他任务类似

// 定义默认任务,执行gulp会自动执行的任务
gulp.task('default', function(){
    gulp.run('lint', 'scripts', 'css', 'html', 'image');

    // 监听js文件变化，当文件发生变化后会自动执行任务
    gulp.watch('./src/js/*.js', function(){
        gulp.run('lint','scripts');
    });

    // 监听 css 文件变化
    gulp.watch('./src/css/*.css', function(){
        gulp.run('css');
    });

    // 监听 html 文件变化
    gulp.watch('./src/*.html', function(){
        gulp.run('html');
    });

    // 监听 image 文件变化
    gulp.watch('./src/images/*', function(){
        gulp.run('image');
    });
});