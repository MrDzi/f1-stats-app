'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var f1StatsApp = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
};

var paths = {
    scripts: [f1StatsApp.app + '/**/*.js'],
    styles: [f1StatsApp.app + '/main.scss'],
    views: {
        main: f1StatsApp.app + '/index.html',
        files: [f1StatsApp.app + '/views/**/*.html']
    }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
    .pipe($.jshint, '.jshintrc')
    .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
    .pipe($.sass, {
        outputStyle: 'expanded',
        precision: 10
    })
    .pipe($.autoprefixer, 'last 1 version')
    .pipe(gulp.dest, f1StatsApp.app);

///////////
// Tasks //
///////////

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(styles());
});

gulp.task('lint:scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(lintScripts());
});

gulp.task('clean:tmp', function(cb) {
    rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function() {
    openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
    $.connect.server({
        root: [f1StatsApp.app, '.tmp'],
        livereload: true,
        port: 9000
    });
});

gulp.task('watch', function() {
    $.watch(paths.styles)
        .pipe($.plumber())
        .pipe(styles())
        .pipe($.connect.reload());

    $.watch(paths.views.files)
        .pipe($.plumber())
        .pipe($.connect.reload());

    $.watch(paths.scripts)
        .pipe($.plumber())
        .pipe($.connect.reload());

    gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function(cb) {
    runSequence('clean:tmp', ['start:client'],
        'watch', cb);
});

gulp.task('bower', function() {
    return gulp.src(paths.views.main)
        .pipe(wiredep({
            directory: f1StatsApp.app + '/bower_components',
            ignorePath: '..'
        }))
        .pipe(gulp.dest(f1StatsApp.app + '/views'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function(cb) {
    rimraf('./dist', cb);
});

gulp.task('client:build', ['html', 'styles'], function() {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src(paths.views.main)
        .pipe($.useref({ searchPath: [f1StatsApp.app, '.tmp'] }))
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.minifyCss({ cache: true }))
        .pipe(cssFilter.restore())
        .pipe($.rev())
        .pipe($.revReplace())
        .pipe(gulp.dest(f1StatsApp.dist));
});

gulp.task('html', function() {
    return gulp.src(f1StatsApp.app + '/views/**/*')
        .pipe(gulp.dest(f1StatsApp.dist + '/views'));
});

gulp.task('images', function() {
    return gulp.src(f1StatsApp.app + '/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(f1StatsApp.dist + '/images'));
});

gulp.task('copy:extras', function() {
    return gulp.src(f1StatsApp.app + '/*/.*', { dot: true })
        .pipe(gulp.dest(f1StatsApp.dist));
});

gulp.task('copy:fonts', function() {
    return gulp.src(f1StatsApp.app + '/fonts/**/*')
        .pipe(gulp.dest(f1StatsApp.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function() {
    runSequence(['images', 'copy:extras', 'copy:fonts', 'client:build']);
});

gulp.task('default', ['build']);
