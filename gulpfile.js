var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var spawn = require('child_process').spawn;
var copy = require('gulp-copy');


gulp.task('webpack', function(cb) {
    var cmd = spawn('node_modules/.bin/webpack', [], {stdio: 'inherit'});
    cmd.on('close', function(code) {
        console.log(code);
        cb(code);
    });
});

gulp.task('static', function() {
    gulp.src('static/**')
        .pipe(copy('publish', {prefix: 1}));
});

gulp.task('build', ['webpack', 'static']);

gulp.task('deploy', ['build'], function() {
    return gulp.src('./publish/**/*')
        .pipe(ghPages());
});
