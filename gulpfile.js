var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function(){
  gulp.src('./angular-socialshare.js')
  .pipe(rename('angular-socialshare.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./'));
});
