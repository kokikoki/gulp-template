var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require('../config.js').sass;

gulp.task("sass", function() {
    gulp.src(config.src + '/*.scss')
        .pipe($.plumber())
        .pipe($.sass(config.options))
        .pipe($.pleeease(config.please.options))
        .pipe(gulp.dest(config.dest))
});
