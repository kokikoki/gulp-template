var gulp = require("gulp");
var $ = require("gulp-load-plugins")();

var browserify = require('browserify');
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var watchify   = require( 'watchify' );
var browserSync = require("browser-sync");
var babelify    = require('babelify');
var config = require('../config.js').bundle;
var IS_PRODUCTION = require('../config.js').IS_PRODUCTION;

function compile(isUglify, isWatch) {
    isUglify = isUglify ? true : false;
    isWatch = isWatch ? true : false;

    $.util.log('Compiling JS...');

    var bundler = null;
    if (isWatch) {
        bundler = watchify(browserify(config.src + '/' + config.bundle, config.browserify));
    } else {
        bundler = browserify(config.src + '/' + config.bundle, config.browserify);
    }

    bundler.transform(babelify, {
        presets: ["es2015", "react"],
    });

    function bundle() {
        return bundler.bundle().on('error', $.notify.onError({
                title: 'Bundle Error',
                message: "<%= error.message %>"
            }))
            .pipe(source(config.app))
            .pipe(buffer())
            .pipe($.if(isUglify, $.uglify({preserveComments: 'some'})))
            .pipe(gulp.dest(config.dest))
            .pipe(browserSync.stream({once: true}));
    }

    bundler.on('update', function () {
        bundle(false, true);
    });

    return bundle();
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return compile(false, true);
});
gulp.task('bundle-production', function () {
    return compile(true);
});

/* js
 *********************************************************************************/
gulp.task('bundle02', function() {
    //watchify(
        browserify({
            entries: [config.src + '/' + config.bundle]
        })
    //)
    .bundle()
    .pipe( source( config.bundle ) )
    .pipe( buffer() )
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream({once: true}));
});

