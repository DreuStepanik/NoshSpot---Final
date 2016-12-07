var gulp = require('gulp'),
   livereload = require('gulp-livereload'),
   gutil = require('gulp-util'),
   clean = require('gulp-clean'),
   connect = require('gulp-connect'),
   inject = require('gulp-inject'),
   wiredep = require('wiredep').stream,
   open = require('gulp-open');

var jsSources = ['app/js/**/*.js'],
   cssSources = ['app/css/**/*.css'],
   htmlSources = ['app/**/*.html'];

var paths = ['./app/js/app.module.js', './app/js/**/*.js', './app/css/**/*.css'];

gulp.task('watch', function() {
   gulp.watch(jsSources, ['js']);
   gulp.watch(cssSources, ['css']);
   gulp.watch(htmlSources, ['html']);
});

gulp.task('inject', function(){
    var sources = gulp.src(paths, {read: false});
    return gulp.src('./app/index.html')
        .pipe(wiredep())
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./app/'));
});

gulp.task('connect', function(){
    return connect.server({
        root: './app',
        livereload: true
    });
});

gulp.task('js', function() {
   gulp.src(jsSources)
       .pipe(connect.reload())
});

gulp.task('html', function() {
   gulp.src(htmlSources)
       .pipe(connect.reload())
});

gulp.task('css', function() {
   gulp.src(cssSources)
       .pipe(connect.reload())
});

gulp.task('app', function() {
    var browser;
    if (process.platform === 'darwin') {
        browser = 'Google Chrome'
    } 
    else {

        browser = 'chrome'
    }
    var options = {
        uri: 'http://localhost:8080',
        app: browser
    };
    gulp.src('./app/index.html')
        .pipe(open(options));
});

gulp.task('serve', ['connect', 'watch', 'inject', 'app']);

