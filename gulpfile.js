var gulp = require('gulp');

var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var webpackConfig = require('./config/webpack.config.js');

gulp.task('default', ['webpack',], function() {

});

gulp.task('webpack', function() {
	return gulp.src('src/app.js')
					.pipe( webpackStream( webpackConfig ))
					.pipe( gulp.dest('www/js/') );
});
