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

const DIST_PATH = "./dist";


// dev environment build:
gulp.task('dev', function() {
    //copy js & html to distributable dir
    gulp.src([
      'app/public/**/*.js',
      'app/public/**/*.html',
      'app/public/**/*.html'])
      .pipe(gulp.dest(DIST_PATH));
    //compile css and move it to distributable dir
    gulp.src('./app/public/styles/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest(DIST_PATH));

});

gulp.task('local',function(){
  gulp.watch('app/**/*.html', ['dev']);
  gulp.watch('app/**/*.js', ['dev']);
  gulp.watch('app/**/*.css', ['dev']);
})


// producton build :: todo-> implement it

gulp.task('angular', function() {
  return gulp.src([
    'app/application.js',
    'app/controllers/*.js',
    'app/services/*.js'
  ])
    .pipe(concat('application.js'))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('public/js'));
});

gulp.task('templates', function() {
  return gulp.src('app/partials/**/*.html')
    .pipe(templateCache({ root: 'partials', module: 'MyApp' }))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('public/js'));
});

gulp.task('vendor', function() {
  return gulp.src('app/vendor/**/*.js')
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('public/js/lib'));
});

gulp.task('watch', function() {
  gulp.watch('app/partials/**/*.html', ['templates']);
  gulp.watch('app/**/*.js', ['angular']);
});

gulp.task('build', ['angular', 'vendor', 'templates']);

gulp.task('clean', function(){
  return del([distPath], {
    force: true
  });
});
