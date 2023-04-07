const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
// const rename = require("gulp-rename");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const DIST_FOLDER = "./dist/";
const SRC_FILES = "./src/js/**/*.js";

exports.default = function () {
  return src(SRC_FILES)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(concat("app.min.js"))
    .pipe(dest(DIST_FOLDER));
};
