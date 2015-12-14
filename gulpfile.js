var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var spawn = require('child_process').spawn;


gulp.task('webpack', function(cb) {
    var cmd = spawn('node_modules/.bin/webpack', [], {stdio: 'inherit'});
    cmd.on('close', function(code) {
        console.log(code);
        cb(code);
    });
});

gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});
