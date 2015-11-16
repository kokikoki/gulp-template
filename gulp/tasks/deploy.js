var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require('../config.js').rsync;
/* deploy
 *********************************************************************************/
gulp.task('deploy', ['production'], function() {
    gulp.src([''])
        .pipe($.rsync(config)
            .on('error', function(message) {
                console.log(message);
            })
        )
});

