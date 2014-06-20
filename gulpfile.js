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

var paths = {
  scripts: [ 'app/**/*.js', '!app/bower_components/**/*.js' ],
  html: [
    './app/**/*.html',
    './app/owm-cities.json',
    './app/bower_components/font-awesome/fonts/*',
    '!./app/index.html',
    '!./app/bower_components/**/*.html'
  ],
  index: './app/index.html',
  build: './build/'
}
/* 1 */
gulp.task('clean', function(){
  gulp.src( paths.build,  { read: false } )
    .pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
  gulp.src( paths.html )
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', [ 'copy' ], function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      html: [ minifyHtml({empty: true}) ],
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( paths.build ))
});

gulp.task('build', ['usemin']);

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'app/'
  });
});
gulp.task('default', ['connect']);

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
