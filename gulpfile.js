const gulp = require("gulp"),
    $ = require("gulp-load-plugins")({
        lazy: true
    }),
    // sass = require("gulp-sass"),
    // autoprefixer = require("gulp-autoprefixer"),
    // plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    del = require("del"),
    // userfer = require("gulp-useref"),
    // uglify = require("gulp-uglify"),
    // gulpif = require("gulp-if"),
    // imagemin = require("gulp-imagemin"),
    runSequence = require("run-sequence"),
    ftp = require("vinyl-ftp"),
    psi = require('psi');
site = 'https://www.kubarazny.pl';
key = '';
argv = require("yargs").argv;
require('dotenv').config();
// gutil = require("gulp-util");


gulp.task("css", function() {

    $.util.log($.util.colors.yellow("Compiling SASS to CSS..."));

    return gulp.src("src/sass/main.scss")
        .pipe($.plumber())
        .pipe($.sass())
        .on('error', $.sass.logError)
        .pipe($.autoprefixer())
        .pipe($.combineMq({
            beautify: false
        }))
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());

});

gulp.task("server", function() {

    browserSync.init({
        server: "src/"
    });

});


gulp.task("watch", function() {

    gulp.watch("src/sass/**/*.scss", ["css"]);
    gulp.watch(["src/*.html", "src/**/*.js"], browserSync.reload);

});

gulp.task("clean", function() {

    return del("dist/");

});

gulp.task("html", function() {

    gulp.src("src/*.html")
        .pipe($.useref())
        .pipe($.if("*.js", $.uglify()))
        .pipe(gulp.dest("dist/"));

});

gulp.task("images", function() {

    return gulp.src("dist/images/**/*", {
            base: "dist"
        })
        .pipe($.imagemin())
        .pipe(gulp.dest("dist/"));

});


gulp.task("copy", function() {

    return gulp.src(["src/css/**/*.css", "src/images/**/*", "src/assets/**/*", "src/fonts/*"], {
            base: "src"
        })
        .pipe(gulp.dest("dist/"));

});


gulp.task('minifyhtml', function() {
    return gulp.src('dist/*.html')
        .pipe($.htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("minifycss", function() {

    return gulp.src('src/css/*.css')
        .pipe($.shorthand())
        .pipe($.cssmin())
        .pipe(gulp.dest('src/css/'));

});

gulp.task('uncss', function() {
    return gulp.src('src/css/style.css')
        .pipe($.uncss({
            html: ['dist/index.html'],
            ignore: [
                /\.affix/,
                /\.alert/,
                /\.close/,
                /\.collaps/,
                /\.fade/,
                /\.has/,
                /\.help/,
                /\.in/,
                /\.modal/,
                /\.open/,
                /\.popover/,
                /\.tooltip/,
                '.home .white',
                '.scrolled',
                '.has-error .help-block'
            ]
        }))
        .pipe(gulp.dest('src/css/'));
});



gulp.task("upload", function() {

    const conn = ftp.create({
        host: process.env.FTP_dev_host,
        user: process.env.FTP_dev_user,
        password: process.env.FTP_dev_password,
        log: $.gutil.log
    });

    return gulp.src("dist/**/*")
        .pipe(conn.dest("public_html/"));

});

gulp.task("upload-prod", function() {

    const conn = ftp.create({
        host: process.env.FTP_prod_host,
        user: process.env.FTP_prod_user,
        password: process.env.FTP_prod_password,
        log: $.util.log
    });

    return gulp.src("dist/**/*")
        .pipe(conn.newerOrDifferentSize("public_html/"))
        .pipe(conn.dest("public_html/"));

});



gulp.task("build", function(callback) {

    runSequence("clean", "html", "uncss", "minifycss", "copy", "images", "minifyhtml", callback);

});

gulp.task("build:server", ["build"], function() {

    browserSync.init({
        server: "dist/"
    });

});


gulp.task('mobile', function() {
    return psi(site, {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }).then(function(data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    });
});

gulp.task('desktop', function() {
    return psi(site, {
        nokey: 'true',
        // key: key,
        strategy: 'desktop',
    }).then(function(data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    });
});

gulp.task("default", ["css", "server", "watch"]);
