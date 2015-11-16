var gulp = require("gulp");
var _ = require('lodash');
var mergeStream = require('merge-stream');
var config = require('../config.js').copy;

gulp.task('copy', function() {
    var merge = mergeStream();
    _.each(config, function(file) {
        merge.add(gulp.src(file.from).pipe(gulp.dest(file.to)));
    });
    return merge.isEmpty() ? null : merge;
});