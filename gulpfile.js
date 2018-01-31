// Konfigurasi
var gulp  = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var merge = require('merge-stream');
var clean = require('gulp-clean');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var zip = require('gulp-zip');
// Task `default`
gulp.task('default', function(){
    console.log ('code untuk task default');
});

// Konfigurasi
var gulp  = require('gulp');

// Compile SCSS
gulp.task('sass', function () {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))
});

// Konfigurasi
var gulp  = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


// Compile SCSS
gulp.task('sass', function () {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))
});

// Default Task. Local webserver dan sinkronisasi dengan browser. 
gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch('./app/**/*').on('change', reload);
    gulp.watch('./app/scss/*.scss',['sass']);

});

// Konfigurasi
var gulp  = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

// Compile SCSS
gulp.task('sass', function () {
  return gulp.src('./app/scss/*.scss')
    .pipe(plumber()
    .pipe(sass())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./app/css'))
    .pipe(reload({stream: true})));
});

// Clean Build Directory
gulp.task('cleanBuild',function(){
     return gulp.src('build', {read: false})
     .pipe(clean());
});

// Deploy to Build Directory
gulp.task('deploy',['cleanBuild'], function(){
 
// optimasi css
 var cssOptimize = gulp.src('app/css/*.css')
//    .pipe(gutil.log('css Optimize Start'))
    .pipe(cssnano())
  //  .pipe(gutil.log('css Optimize Finish'))
    .pipe(gulp.dest('build/css/'));
     

// menggabung semua file js dan optimasi
var jsOptimize = gulp.src('app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));


// optimasi image
var imgOptimize = gulp.src('app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'))

// optimasi html
var htmlOptimize = gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));

return merge(cssOptimize,jsOptimize,imgOptimize,htmlOptimize); 

})

// Deploy to Zip file 
gulp.task('deployZip',['deploy'],function(){
    var zipNow = gulp.src('build/**')
    .pipe(zip('deploy.zip'))
    .pipe(gulp.dest('build'));
});