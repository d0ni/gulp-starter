const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const size = require('gulp-size');
const mode = require('gulp-mode')();
const paths = require('../paths');

const webp = require('gulp-webp');

const jxr = require('gulp-jpeg-xr');
const jp2 = require('gulp-jpeg-2000');
// const imageminWebp = require('imagemin-webp');
// const imgc = require('gulp-imgconv');

const imageMinConfig = {
  mozjpeg: { quality: 75, progressive: true },
  optipng: { optimizationLevel: 5 },
  svgo: {
    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
  },
};

const images = () => {
  return (
    gulp
      .src(paths.src.images + '.{jpg,jpeg,png}')
      .pipe(newer(paths.build.images))

      // minimalize img
      .pipe(
        mode.production(
          imagemin([
            imagemin.mozjpeg(imageMinConfig.mozjpeg),
            imagemin.optipng(imageMinConfig.optipng),
            imagemin.svgo(imageMinConfig.svgo),
          ]),
        ),
      )
      .pipe(mode.production(gulp.dest(paths.build.images)))

      // convert to jpeg-2000
      // .pipe(mode.production(gulp.src(paths.build.images + '.{jpg,jpeg,png}')))
      // .pipe(mode.production(jp2()))
      // .pipe(mode.production(gulp.dest(paths.build.images)))

      // convert to jpeg-xr
      // .pipe(mode.production(gulp.src(paths.build.images + '.{jpg,jpeg,png}')))
      // .pipe(mode.production(jxr()))
      // .pipe(mode.production(gulp.dest(paths.build.images)))

      // convert to webp
      .pipe(
        mode.production(gulp.src(paths.src.images + '.{jpg,jpeg,png,webp}')),
      )
      .pipe(mode.production(webp()))
      .pipe(mode.production(gulp.dest(paths.build.images)))

      .pipe(size({ showFiles: true }))
      .pipe(gulp.dest(paths.build.images))
  );
};

module.exports = images;
