// ------Imports------
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglifycss = require('gulp-uglifycss');

// To HTML
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');

const dartSass = require('sass')
const gulpSass = require('gulp-sass')
const sass = gulpSass(dartSass)

// ts
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json')


// ------functions------
async function minifyHTML() {
    console.log(
        '\n\u001b[36m[exec] minify HTML...\u001b[0m\n'
    )

    return gulp.src('src2/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('build2'))
}

async function SASStoCSS() {
    console.log(
        '\n\u001b[36m[exec] SASS => CSS...\u001b[0m\n'
    )

    return gulp.src('src2/styles/style.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build2/css'))
}

async function tsToJs() {
    console.log(
        '\n\u001b[36m[exec] TS => JS...\u001b[0m\n'
    )

    return gulp.src('src2/scripts/*.ts')
        .pipe(tsProject())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('build2/scripts'))
}



// ------TASKS------
// start task
{
    gulp.task('start', cb => {
        console.log(
            '\n\u001b[32m[start] Initializing...\u001b[0m\n'
        ); cb()
    })
}
// end task
{
    gulp.task('end', cb => {
        console.log(
            '\n\u001b[32m[end] Finished\u001b[0m\n'
        ); cb()
    })
}
// middlewere task
{
    gulp.task('middlewere', cb => {
        console.log(
            '\n\u001b[36m[exec] executing...\u001b[0m\n'
        );
        cb()
    })
}
// html task
{
    gulp.task('app.html', cb => {
        minifyHTML()
        cb()
    })
}
// css task
{
    gulp.task('app.css', cb => {
        SASStoCSS()
        cb()
    })
}
// js task
{
    gulp.task('app.js', cb => {
        tsToJs()
        cb()
    })
}
// imgs task
{
    gulp.task('app.imgs', cb => {
        // imgs()
        console.log('img ainda nao')
        cb()
    })
}

// ------EXECUTE TASKS------
gulp.task('default',
    gulp.series(['start', 'middlewere', 'app.html', 'app.css', 'app.js', 'app.imgs', 'end']))

