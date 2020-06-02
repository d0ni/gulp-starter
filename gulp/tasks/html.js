const gulp = require('gulp');
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const cachebust = require('gulp-cache-bust');
const mode = require('gulp-mode')();
const paths = require('../paths');
const webpHTML = require('gulp-webp-html');
// const webpHTML = require('../plagin');

const htmlminConfig = {
  collapseWhitespace: true,
};

const cachebustConfig = {
  type: 'timestamp',
};

const html = () => {
  return gulp
    .src(paths.src.html)
    .pipe(rigger())
    .pipe(mode.production(cachebust(cachebustConfig)))
    .pipe(mode.production(webpHTML()))
    .pipe(mode.production(htmlmin(htmlminConfig)))
    .pipe(gulp.dest(paths.build.html));
};

module.exports = html;
