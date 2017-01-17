//TODO:: fix gulp file

var gulp = require('gulp');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');

const DIST_PATH = "dist/";
const DIST_JS = DIST_PATH + 'js/';
const DIST_VIEWS = DIST_PATH + 'views/';
const DIST_STYLES = DIST_PATH + 'styles/';
const DIST_VENDOR = DIST_PATH + 'vendor/';
const DIST_ASSETS = DIST_PATH + 'assets/';



// TODO:: implement along with production build
// gulp.task('replace', () => {
//   gulp.src(DIST_VIEWS + 'index.html')
//     .pipe(htmlreplace({'css': 'styles.min.css','js': 'js/bundle.min.js'}))
//
//     .pipe(gulp.dest(''));
// });


gulp.task('dev.js', ()  => {
  return gulp.src('app/public/js/**/*.js').pipe(gulp.dest(DIST_JS));
});

//compile css and move it to distributable dir
gulp.task('dev.styles', ()  => {
  return gulp.src('./app/public/styles/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(DIST_STYLES));
});

//copy view templates
gulp.task('dev.views', ()  => {
  return gulp.src('app/public/views/**/*.html').pipe(gulp.dest(DIST_VIEWS));
});

//copy any possible asset (images ? sounds? whatever)
gulp.task('dev.assets', ()  => {
  return gulp.src('app/public/assets/**/*.*').pipe(gulp.dest(DIST_ASSETS));
});

//copy vendor libs
gulp.task('dev.vendor', ()  => {
  return gulp.src('app/public/vendor/**/*.*').pipe(gulp.dest(DIST_VENDOR));
});

if (argv.production) {
  console.info ("BUILDING PRODUCTION DISTRIBUTABLE");
  console.warn ("PRODUCTION BUIILD NOT DEFINED YET");
} else {
  gulp.task('build',['dev.js','dev.styles','dev.views','dev.assets','dev.vendor']);
}

gulp.task('watch',function(){
  gulp.watch('app/public/views/**/*.html', ['dev.views']);
  gulp.watch('app/public/js/**/*.js', ['dev.js']);
  gulp.watch('app/public/styles/*.scss', ['dev.styles']);
  gulp.watch('app/public/assets/**/*.*', ['dev.assets']);
  gulp.watch('app/public/vendor/**/*.*', ['dev.vendor']);
})

//   gulp.watch('app/**/*.js', ['angular']);
gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});


// producton build :: todo-> implement it
//
// gulp.task('angular', function() {
//   return gulp.src([
//     'app/application.js',
//     'app/controllers/*.js',
//     'app/services/*.js'
//   ])
//     .pipe(concat('application.js'))
//     .pipe(ngAnnotate())
//     .pipe(gulpif(argv.production, uglify()))
//     .pipe(gulp.dest('public/js'));
// });
//
// gulp.task('templates', function() {
//   return gulp.src('app/partials/**/*.html')
//     .pipe(templateCache({ root: 'partials', module: 'MyApp' }))
//     .pipe(gulpif(argv.production, uglify()))
//     .pipe(gulp.dest('public/js'));
// });
//
// gulp.task('vendor', function() {
//   return gulp.src('app/vendor/**/*.js')
//     .pipe(gulpif(argv.production, uglify()))
//     .pipe(gulp.dest('public/js/lib'));
// });
//
// gulp.task('watch', function() {
//   gulp.watch('app/partials/**/*.html', ['templates']);
//   gulp.watch('app/**/*.js', ['angular']);
// });
//
// gulp.task('build', ['angular', 'vendor', 'templates']);
