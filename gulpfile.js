const { src, dest, series, parallel, watch } = require('gulp');
const uglify = require('gulp-uglify'); // Compress JS
const sass = require('gulp-sass')(require('sass')); // Compile SASS (SCSS) to CSS
const minifyCSS = require('gulp-clean-css'); // Minify CSS
const browsersync = require('browser-sync').create(); // Reload HTML page

const files = {
	scssPath: 'build/sass/*.scss',
	jsPath: 'build/js/*.js',
};

function compileJs() {
    return src(files.jsPath)
            .pipe(uglify())
            .pipe(dest('assets/js'));
}

function compileScss() {
    return src(files.scssPath)
            .pipe(sass())
            .pipe(minifyCSS())
            .pipe(dest('assets/css'));
}

function browserServe(cb) {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
    cb();
}

function browserReload(cb) {
	browsersync.reload(); // reloads browsersync server
	cb();
}

function watchTask() {
    watch('index.html', browserReload);
    watch(
		[files.scssPath, files.jsPath],
        { interval: 1000, usePolling: true },
		series(parallel(compileScss, compileJs), browserReload)
	);
}

exports.build = parallel(compileJs, compileScss);
exports.serve = series(parallel(compileJs, compileScss), browserServe, watchTask);