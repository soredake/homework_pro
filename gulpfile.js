const { src, dest, watch, task, series } = require("gulp");
const concat = require("gulp-concat");
const concatCSS = require("gulp-concat-css");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint-new");
const DIST_FOLDER = "./dist/";
const JS_SRC_FILES = ["./src/js/*/*.js", "./src/js/*.js"];
const CSS_SRC_FILES = "./src/css/**/*.css";

const jsPrep = () =>
  src(JS_SRC_FILES)
    .pipe(sourcemaps.init())
    .pipe(concat("app.min.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env", "minify"],
        comments: false,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest(DIST_FOLDER));

const cssPrep = () => {
  return src(CSS_SRC_FILES)
    .pipe(sourcemaps.init())
    .pipe(concatCSS("styles.min.css"))

    .pipe(cleanCSS({ compatibility: "ie9", level: 2 }))
    .pipe(sourcemaps.write())
    .pipe(dest(DIST_FOLDER));
};

const startLiveServer = (cb) => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  cb();
};

const reloadPage = (cb) => {
  browserSync.reload();
  cb();
};

const watcher = () => {
  watch("*.html", reloadPage);
  watch(CSS_SRC_FILES, series(cssPrep, reloadPage));
  watch(JS_SRC_FILES, series(jsPrep, reloadPage));
};

const linter = () => {
  return src(JS_SRC_FILES)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

task("lint-js", linter);
task("live", series(cssPrep, jsPrep, startLiveServer, watcher));
task("default", series(jsPrep, cssPrep));
