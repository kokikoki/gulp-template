var gulp = require( 'gulp' );
var pather = require('path');
var config = require( '../config.js' ).images;

/* images
 *********************************************************************************/
gulp.task("images", function() {
    gulp.src(pather.join(config.src, '**', '*'))
        .pipe(gulp.dest(config.dest))
});

