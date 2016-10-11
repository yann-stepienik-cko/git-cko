var gulp = require("gulp");
var watch = require('gulp-watch');
var gulpLiveScript = require('gulp-livescript');
var plumber = require('gulp-plumber');


var paths = {
  "scripts" : "./src/*.ls"
}


/*
  BUILD PHASE
*/

//Livescript
gulp.task('ls', function() {
    return gulp.src(paths.scripts)
      .pipe(gulpLiveScript({bare: true}))
      .pipe(plumber())
      .pipe(gulp.dest('./dist/'));
});


// *******
gulp.task('default', function() {
    watch(paths.scripts, function (events, done) {
        gulp.start('ls', done);
    });
});
