const gulp = require("gulp");
const { compilerTs, compilerJs, copyDeclare, clean } = require("./gulp");

gulp.task("compilerTs", compilerTs("tsconfig.build.json"));
gulp.task("compilerJs", compilerJs);
gulp.task("copyDeclare", copyDeclare);
gulp.task("clear:temp", clean("temp"));
gulp.task("clear:lib", clean("lib"));

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("clear:temp", "clear:lib"),
    "compilerTs",
    gulp.parallel("compilerJs", "copyDeclare"),
    "clear:temp"
  )
);
