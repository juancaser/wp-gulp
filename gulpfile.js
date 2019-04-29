const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
var tasks = {
    path: {
        styles: 'src/scss/**/*.scss',
        scripts: 'src/js/**/*.js'
    },
    styles: function(){
        return src(tasks.path.styles)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(sourcemaps.write('./'))
            .pipe(dest('./'));        
    },
    scripts: function(){
        return src([tasks.path.scripts]).pipe(dest('./js'));
    },
    watch: function(){
        watch([tasks.path.styles, tasks.path.scripts], parallel(tasks.styles, tasks.scripts));    
    }
};
exports.default = series(parallel(tasks.styles, tasks.scripts), tasks.watch);