import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename'
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';
import htmlmin from 'gulp-htmlmin';


const SOURCE_DIR = 'source';
const BUILD_DIR = 'build';

const PATH = {
  build: {
    html: BUILD_DIR + "/",
    js: BUILD_DIR + "/js/",
    css: BUILD_DIR + "/css/",
    images: BUILD_DIR + "/img/",
    fonts: BUILD_DIR + "/fonts/",
    videos: BUILD_DIR + "/videos/"
  },
  source: {
    html: SOURCE_DIR + '/*.html',
    scss: SOURCE_DIR + '/sass/style.scss',
    js: SOURCE_DIR + '/js/*.js',
    images: SOURCE_DIR + '/img/**/*.{png,jpg}',
    svg: SOURCE_DIR + '/img/**/*.svg',
    spriteSvg: SOURCE_DIR + '/img/icons/*.svg'
  }
}


// Styles
const styles = () => {
  return gulp.src(PATH.source.scss, { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () => {
  return gulp.src(PATH.source.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(BUILD_DIR));
}

// Scripts
const scripts = () => {
  return gulp.src(PATH.source.js)
    .pipe(gulp.dest(PATH.build.js))
    .pipe(browser.stream());
}

// Images
const optimizeImages = () => {
  return gulp.src(PATH.source.images)
    .pipe(squoosh())
    .pipe(gulp.dest(PATH.build.images))
}

// Copy Images
const copyImages = () => {
  return gulp.src(PATH.source.images)
    .pipe(gulp.dest(PATH.build.images))
}

// WebP
const createWebp = () => {
  return gulp.src(PATH.source.images)
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest(PATH.build.images))
}

// SVG
const svg = () => {
  return gulp.src([PATH.source.svg, `!${PATH.source.spriteSvg}`])
    .pipe(svgo())
    .pipe(gulp.dest(PATH.build.images));
}


// SVG sprite
const sprite = () => {
  return gulp.src(PATH.source.spriteSvg)
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(PATH.build.images));
}

// Copy others
const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ], {
    base: SOURCE_DIR
  })
    .pipe(gulp.dest(BUILD_DIR))
  done();
}

// Clean build
const clean = () => {
  return del(BUILD_DIR);
};


// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: BUILD_DIR
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload Server
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Production Build`
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
);

// Dev Build
export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
