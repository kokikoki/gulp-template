/**
 * クリーンタスク
 * 指定されたディレクトリ以下をすべて削除する
 */
var gulp = require( 'gulp' );
var del = require( 'del' );
var config = require( '../config.js');


gulp.task('clean', function () {
    del.sync([config.dest]);
    //del([config.dist], function (err, deletedFiles) {
    //    console.log('Files deleted:', deletedFiles.join(', '));
    //});
});