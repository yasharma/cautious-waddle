'use strict';

const gulp      = require('gulp'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    cleancss    = require('gulp-clean-css'),
    assets      = require('./gulp.assets.js'),
    pump        = require('pump');

/*
 * JSHint to lint all the js files
 */

gulp.task('jshint',['admin.app:uglify'],  () => {
    return gulp.src(assets.adminAppList)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


/*
* This task will minify all the css files
* @ front-end
*/
gulp.task('admin-site:cssmin', () => {
    gulp.src([
        
    ])
    .pipe(concat('admin-site.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./public/css/'));
});

/*
minify external Js files for  admin-end
*/
gulp.task('admin-site:uglify', (cb) => {
    pump([
        gulp.src(assets.adminVendorList),
        concat('admin-site.min.js'),
        uglify({output:{beautify: false, max_line_len:50000}}),
        gulp.dest('./assets/js')
    ],cb);
});

/*
* This task is will minify all the angular modules files
* @ front-end
*/
gulp.task('admin.app:uglify', (cb) => {
    pump([
        gulp.src(assets.adminAppList),
        concat('admin.app.min.js'),
        gulp.dest('./assets/js')
    ],cb);
});


gulp.task('default', [
    'admin-site:uglify',
    'admin.app:uglify',
    'watch'
]);

gulp.task('admin:watch', function() {
    gulp.watch(assets.adminAppList, ['jshint']);
});