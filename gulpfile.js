// Include gulp
var gulp = require('gulp'); 
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');

var config = {
  build: './build'
}
/* 2 */
// gulp.task('clean', function() {
//     return gulp
//       .src(['./index.html', 'assets/js/min'], { read:false })
//       .pipe(clean());
// });

// gulp.task('html', ['clean'], function () {
// var context = rev.Context();
//   return gulp.src('./dev.html')
//     .pipe(rename('index.html'))
//     .pipe(usemin({ cssmin: false, htmlmin: false, jsmin: false }))
//     .pipe(context.replace(/src="assets\/js\/min\/(\w+\.js)"/g, 'src="assets/js/min/{{$1}}"'))
//     .pipe(gulp.dest('./'));
// });

// gulp.task('js', ['html'], function () {
//   return gulp.src('assets/js/min/app.js') // FRAGILE: gulp-usemin creates this file
//     .pipe(ngmin())
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./assets/js/min/')),
// });

// gulp.task('default', ['js']);

/* 1 */
gulp.task('clean', function(){
  gulp
    .src( // select the folder
      [ config.build ],
      { read: false } // don't read content
    )
    .pipe(clean());
});

gulp.task('copy-html', ['clean'], function() {
  gulp
    .src(
      ['./app/**/*.html', './app/owm-cities.json', '!./app/index.html'],
      { base: './app' }
    )
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [ngmin({dynamic: true}), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['copy-html', 'usemin']);

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'app/'
  });
});
gulp.task('default', ['connect']);
