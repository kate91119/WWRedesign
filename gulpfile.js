const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
    });

gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.stream());
    });

gulp.task('serve', gulp.series('sass', function() {
        browserSync.init({
        server: "./app/"
        });
        
    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
    }));

gulp.task('default', gulp.series('js', 'serve'));