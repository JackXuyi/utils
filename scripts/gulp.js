const gulp = require("gulp");
const { resolveRootPath } = require("./util");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
const copy = require("gulp-copy");
const shell = require("gulp-shell");
const del = require("del");

const src = resolveRootPath("./src");
const tempPath = resolveRootPath("./temp");
const targetPath = resolveRootPath("./lib");

function compilerTs(tsConfigFile) {
  const tsProject = ts.createProject(resolveRootPath(tsConfigFile), {
    declaration: true,
  });

  return function () {
    return gulp
      .src([src + "/**/*.ts"])
      .pipe(tsProject())
      .pipe(gulp.dest(tempPath));
  };
}

function compilerJs() {
  return gulp
    .src([tempPath + "/**/*.js"])
    .pipe(babel())
    .pipe(gulp.dest(targetPath));
}
function copyDeclare() {
  return gulp
    .src([tempPath + "/**/*.d.ts"])
    .pipe(copy(targetPath, { prefix: 2 }))
    .pipe(gulp.dest(targetPath));
}

function clean(dir) {
  const realDir = resolveRootPath(dir);
  return function (cb) {
    return del([realDir], { force: true });
  };
}

module.exports = {
  compilerTs,
  compilerJs,
  copyDeclare,
  clean,
};
