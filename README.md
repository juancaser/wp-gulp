# WP + Gulp 4 task workflow
## Requisites

To install node and gulp please refer to ther respected documention instructions. Once you've done that you need to install this following node modules:

```
$ npm install gulp gulp-sass gulp-sourcemaps
```

## Customization

To customise, please edit `gulpfile.js`and change the path according to your directory structure.

```javascript
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
        watch(
          [tasks.path.styles, tasks.path.scripts], 
          parallel(tasks.styles, tasks.scripts)
        );    
    }
};
exports.default = series(
  parallel(tasks.styles, tasks.scripts), 
  tasks.watch
);
```

