var gulp  = require('gulp');
var watch = require('gulp-watch');
var mocha = require('gulp-mocha');
var bump  = require('gulp-bump');
var gp_deploy_doc = require('gulp-gh-pages');

var source_path = ['test/**/*.js', 'lib/*.js'];

gulp.task('watch', function() {
  gulp
    .watch(source_path, ['mocha']);
});

gulp.task('mocha', function () {
  gulp
    .src(source_path , {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('patch', function(){
  gulp
    .src('./package.json')
    .pipe(bump({type:'patch', indent: 4 }))
    .pipe(gulp.dest('./'));
});

gulp.task('doc', function () {
  return gulp.src( __dirname + '/doc/**/*')
    .pipe(gp_deploy_doc());
});

gulp.task('default',['mocha', 'watch']);