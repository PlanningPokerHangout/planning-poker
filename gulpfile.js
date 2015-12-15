var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    spawn = require('child_process').spawn,
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    tag_version = require('gulp-tag-version');


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

function inc(importance) {
    // get all the files to bump version in 
    return gulp.src('./package.json')
        // bump the version number in those files 
        .pipe(bump({type: importance}))
        // save it back to filesystem 
        .pipe(gulp.dest('./'))
        // commit the changed version number 
        .pipe(git.commit('bumps package version'))
        // **tag it in the repository** 
        .pipe(tag_version());
}

gulp.task('patch', function() { return inc('patch'); });
gulp.task('feature', function() { return inc('minor'); });
gulp.task('release', function() { return inc('major'); });

gulp.task('deploy', ['build'], function() {
    return gulp.src('./publish/**/*')
        .pipe(ghPages());
});
