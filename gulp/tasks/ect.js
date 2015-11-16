var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var pather = require('path');
var _ = require('lodash');
var config = require('../config.js').ect;
var dir = config.src;

var ect_option = {data: function(filename, cb) {
    console.log(filename);
    cb(config.variables)
}};
/* ect
 *********************************************************************************/
gulp.task('ect', function() {
    _.each(dir, function (v, i) {
        gulp.src(pather.join(config.base, v, '*.ect'))
            .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
            .pipe($.ect(ect_option))
            .pipe(gulp.dest(pather.join(config.dest, v)));
    });
});

_.each(dir, function (v, i) {
    gulp.task('ect_'+v, function() {
        gulp.src(pather.join(config.base, v, '*.ect'))
            .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
            .pipe($.ect(ect_option))
            .pipe(gulp.dest(pather.join(config.dest, v)));
    });
});

