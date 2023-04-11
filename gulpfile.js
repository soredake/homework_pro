const { src, dest } = require("gulp");
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const DIST_FOLDER = "./dist/";
const JS_SRC_FILES = ["./src/js/*/*.js", "./src/js/*.js"];
const CSS_SRC_FILES = "./src/css/**/*.css";

const jsPrep = () => {
  return src(JS_SRC_FILES)
    .pipe(sourcemaps.init())
    .pipe(concat("app.min.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest(DIST_FOLDER));
};

const cssPrep = () => {
  return (
    src(CSS_SRC_FILES)
      .pipe(sourcemaps.init())
      // .pipe(concatCss("app.min.css"))
      .pipe(cleanCSS({ compatibility: "ie9", level: 2 }))
      .pipe(sourcemaps.write())
      .pipe(rename("styles.min.css"))
      .pipe(dest(DIST_FOLDER))
  );
};

gulp.task("default", gulp.series(jsPrep, cssPrep));
