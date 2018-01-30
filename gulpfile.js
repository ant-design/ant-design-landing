const ghpages = require('gh-pages');
const through = require('through2');
const gutil = require('gulp-util');
const beautify = require('gulp-beautify');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const yaml = require('gulp-yaml');

const dist = path.join(__dirname, 'dist');
const out = path.join(__dirname, 'out');

gulp.task('copy', () => gulp.src('dist/**/*').pipe(gulp.dest(out)));

gulp.task('default', ['listTemplates', 'copy']);

function generatorData(fileName) {
  const list = [];
  let firstFile = null;
  function parseAndMerge(file, encode, callback) {
    if (!firstFile) {
      firstFile = file;
    }
    try {
      const parsed = JSON.parse(file.contents.toString(encode));
      list.push(parsed);
    } catch (err) { }
    callback();
  }
  function endStream() {
    const content = JSON.stringify({ list });
    const output = new gutil.File({
      cwd: firstFile.cwd,
      base: firstFile.base,
      path: path.join(firstFile.base, fileName),
      contents: new Buffer(content),
    });
    this.emit('data', output);
    this.emit('end');
  }
  return through.obj(parseAndMerge, endStream);
}

gulp.task('listTemplates', () => {
  gulp.src(['./templates/**/index.yml'])
    .pipe(yaml({ safe: true }))
    .pipe(generatorData('list.json'))
    .pipe(beautify({ indent_size: 2 }))
    .pipe(gulp.dest(out));
});
