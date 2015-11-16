var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
//util
var pather = require('path');
var _ = require("lodash");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var dir = require( 'require-dir' );

var config = require( './gulp/config.js' );
dir( './gulp/tasks', { recurse: true } );

/* browser-sync
 *********************************************************************************/
gulp.task("serve", function() {
    browserSync(config.browserSync)
});
gulp.task('refresh_sass', ['sass'], reload);
gulp.task('refresh_images', ['images'], reload);
gulp.task('refresh_ect', ['ect'], reload);
_.each(config.ect.src, function (v, i) {
    gulp.task('refresh_ect_'+v, ['ect_'+v], reload);
});

/* watch
 *********************************************************************************/
gulp.task("watch", ['ect', 'sass', 'images', 'bundle', 'serve'], function() {
    gulp.watch([
        pather.join(config.ect.base, '_particle', '**', '*.ect'),
        pather.join(config.ect.base, '_layout', '**', '*.ect')
    ], ['ect']);

    _.each(config.ect.src, function (v, i) {
        var watch_dir = pather.join(config.ect.base, v, '*.ect');
        gulp.watch(watch_dir, ['refresh_ect_'+v]);
    });

    gulp.watch(config.sass.src + '/*', ['refresh_sass']);
    gulp.watch(config.images.src + '/*', ['refresh_images']);

});

gulp.task("production", ['clean', 'ect', 'sass', 'images', 'copy', 'bundle-production'], function() {

});
