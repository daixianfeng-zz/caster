var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rename = require("gulp-rename");
var less = require('gulp-less');
var path = require('path');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');


gulp.task('webserver', function(){
    gulp.src('./').pipe(webserver({
            port: 8802,//端口
            host: '127.0.0.1',//域名
            liveload: false,//实时刷新代码。不用f5刷新
            directoryListing: {
                path: './',
                enable: true
            }
        }));
});

var version = '1.0.0';
gulp.task('clean', function(){
    return gulp.src('./dist/'+version)
        .pipe(clean({force: true}));
});

gulp.task('css', function(){
    return gulp.src('./src/**/*.css')
        .pipe(cleanCSS({
            format: {
                breaks: { afterRuleEnds: true },
                spaces: { beforeBlockBegins: true }
            }
        }))
        .pipe(gulp.dest('./dist/'+version+'/'));
});
gulp.task('less', function(){
    return gulp.src(['./src/theme/**/*.less','./src/caster.less'])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cleanCSS({
            format: {
                breaks: { afterRuleEnds: true },
                spaces: { beforeBlockBegins: true }
            }
        }))
        .pipe(gulp.dest('./dist/'+version+'/'));
});

gulp.task('default', ['less','css']);