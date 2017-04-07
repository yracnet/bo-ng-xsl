var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
//var scss = require('gulp-scss');
var out = require('gulp-util');
var xslt = require('gulp-xslt');

var conf = {
	root: './',
	modules: {
		src: '/modules',
		target: '/webapp',
		bootstrap: {
			src: '/bootstrap/3.3.7',
			target: '/build',
			finalName: 'bootstrap',
			task: ['sass']
		},
		angularjs: {
			src: '/angularjs/1.5.8',
			target: '/build',
			finalName: 'angular',
			task: ['js']
		}
	}
};

gulp.task('serve', ['build-bootstrap', 'build-xslt'], function () {
	browserSync.init({
		startPath: '/',
		server: './webapp', 
		middleware: [
			function (req, res, next) {
				if(req.url.indexOf('/views/')>0){
					req.url = req.url.replace('/views/', '/build-xslt'); 
				}
				out.log('req',req.url);
				next();
			}
		],
		online: false,
		ui: false
	});

	gulp.watch([
		'./webapp/**/*.html',
		'./webapp/build/*.css',
		'./webapp/**/*.js',
		'./webapp/*.xsl',
		'./webapp/*.xslt'
	]).on('change', browserSync.reload);
	gulp.watch('./modules/bootstrap/3.3.7/stylesheets/**/*.scss', ['build-bootstrap']);
	gulp.watch('./webapp/views/*.html', ['build-xslt']);

});
	
// Compile sass into CSS & auto-inject into browsers
gulp.task('build-bootstrap', function () {
	return gulp.src('./modules/bootstrap/3.3.7/stylesheets/bootstrap.scss')
									.pipe(sass().on('error', sass.logError))
									.pipe(gulp.dest('./webapp/build'));
});
gulp.task('build-xslt', function() {
    gulp.src('./webapp/views/*.html')
        .pipe(xslt('./webapp/layout.xsl'))
        .pipe(gulp.dest('./webapp/build-xslt/'));
});


gulp.task('default', ['serve']);

