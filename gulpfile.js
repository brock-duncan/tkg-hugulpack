'use strict'

const gulp = require('gulp');
const chalk = require('chalk');
const { spawn } = require('child_process');
const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const del = require('del');
const runSeq = require('run-sequence');
const log = console.log;


// dev server
gulp.task('server', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(['./src/js/**/*', './src/scss/**/*'], () => { 
        gulp.start('build', () => {
            browserSync.reload();
        });
    });
});

// compile sass (use webpack)


// compile js (use webpack)


// build site
// 1. clean ./dist/js|css
gulp.task('clean:dist', (cb) => {
    return del(['./dist/js', './dist/css'], () => {
        cb();
    });
})

// 2. run webpack
gulp.task('webpack',  (cb) => {
    let config = Object.assign({}, webpackConfig);
    
    return webpack(config, (err, stats) => {
        if (err) {
            new Error(err.message);
        }
        log(chalk.green('webpacked'));
        cb();
    });
    
    // 
    // this way works too

    // return new Promise((resolve, reject) => {
    //     resolve(
    //         webpack(config, (err, stats) => {
    //             if (err) {
    //                 new Error(err.message);
    //             }
    //             log(chalk.blue('webpackin'));
    //         })
    //     )
    // });

});
// 3. run hugo
gulp.task('hugo', () => {
    let hugoArgs = ['-d', '../../dist', '-s', './'];

    return spawn('hugo', hugoArgs, {
        cwd: './src/site'
    });
});
gulp.task('build', (cb) => {
    runSeq('webpack', 'hugo', () => {
        log(chalk.green('build complete'));
        cb();
    })
});
