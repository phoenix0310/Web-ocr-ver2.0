var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var sourcemaps = require('gulp-sourcemaps');
var pump= require('pump');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');

gulp.task("clean", function () {
  return del("./fr_src/dist");
});


gulp.task('compress', function() {
  gulp.src([
    '!./fr_src/libs/*.js',
    '!./fr_src/dist/*.js',
    '!./fr_src/main-module/main.module.js',
    './fr_src/main-module/master-ctrl.js',
    './fr_src/**/*.js',
    './fr_src/**/**/*.js',

  	])
     .pipe(sourcemaps.init())
     .pipe(concat('scripts.js'))
     .pipe(gulp.dest('./fr_src/dist'))
     .pipe(rename('scripts.min.js'))
     .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['dist','libs']
     }))
     .pipe(uglify()).on('error', function(e){
      console.log(e);
  })
     .pipe(sourcemaps.write()) //To map positions in minified file with real file --> useful for Debug
     .pipe(gulp.dest('./fr_src/dist'));
});



gulp.task('vendor', function() {
  gulp.src([
    '!./fr_src/libs/jquery-3.1.0.min.js',
    
    './fr_src/libs/angular.min.js',
    './fr_src/libs/ng-file-upload-shim.min.js',
    './fr_src/libs/ng-file-upload.min.js',
  	'./fr_src/libs/angular-ui-router.min.js',
    './fr_src/libs/angular-animate.min.js',
    './fr_src/libs/angular-aria.min.js',
    './fr_src/libs/angular-cookies.min.js',
    './fr_src/libs/angular-messages.min.js',
    './fr_src/libs/angular-sanitize.min.js',
    '!./fr_src/libs/pdf.js',
    '!./fr_src/libs/pdf.worker.js',
    './fr_src/libs/*.js',
  	])
     .pipe(sourcemaps.init())
     .pipe(concat('vendor.js'))
     .pipe(gulp.dest('./fr_src/dist'))
     .pipe(rename('vendor.min.js'))
     .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['dist','libs']
     }))
     .pipe(sourcemaps.write()) //To map positions in minified file with real file --> useful for Debug
     .pipe(gulp.dest('./fr_src/dist'));
});
