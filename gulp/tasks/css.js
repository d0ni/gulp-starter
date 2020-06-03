const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gcmq = require('gulp-group-css-media-queries');
const size = require('gulp-size');
const usedcss = require('usedcss');
const rename = require('gulp-rename');
const mode = require('gulp-mode')();

const paths = require('../paths');

const css = () => {
  return gulp
    .src(paths.src.css)
    .pipe(plumber())
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        sourceMap: true,
        precision: 3,
        errLogToConsole: true,
      }).on('error', sass.logError),
    )
    .pipe(mode.production(gcmq()))
    .pipe(
      mode.production(
        postcss([
          usedcss({
            html: [paths.src.html],
            js: [paths.src.js],
            ignore: ['.open', '.show'],
          }),
          autoprefixer(),
          cssnano(),
        ]),
      ),
    )
    .pipe(mode.development(sourcemaps.write()))
    .pipe(size({ showFiles: true }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest(paths.build.css));
};

module.exports = css;
