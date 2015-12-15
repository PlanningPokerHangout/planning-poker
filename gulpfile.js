var gulp = require('gulp'),
    bump = require('gulp-bump'),
    conventionalChangelog = require('gulp-conventional-changelog'),
    filter = require('gulp-filter'),
    ghPages = require('gulp-gh-pages'),
    git = require('gulp-git'),
    spawn = require('child_process').spawn,
    streamToPromise = require('stream-to-promise'),
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
        .pipe(gulp.dest('publish'));
});

gulp.task('build', ['webpack', 'static']);

function inc(importance) {
    var pkgFilter = filter('package.json', {restore: true});
    var chgFilter = filter('CHANGELOG.md', {restore: true});

    // get all the files to bump version in 
    var stream = gulp.src(['./package.json', 'CHANGELOG.md'])
        // bump package.json version number
        .pipe(pkgFilter)
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'))
        .pipe(pkgFilter.restore)

        // write changelog
        .pipe(chgFilter)
        .pipe(conventionalChangelog({
            preset: "angular",
        }))
        .pipe(gulp.dest('./'))
        .pipe(chgFilter.restore)

        // commit
        .pipe(git.commit('bumps package version'));

    stream.on('end', function() {
        return gulp.src('./package.json')
            .pipe(tag_version());
    });
}

gulp.task('patch', function() { return inc('patch'); });
gulp.task('feature', function() { return inc('minor'); });
gulp.task('release', function() { return inc('major'); });

gulp.task('deploy', ['build'], function() {
    return gulp.src('./publish/**/*')
        .pipe(ghPages());
});
