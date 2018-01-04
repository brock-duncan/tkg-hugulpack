'use strict'

const gulp = require('gulp');
const path = require('path');
const del = require('del');
const log = console.log;
const chalk = require('chalk');
const { spawn } = require('child_process');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const webpackDevConfig = require('./webpack.dev');
const webpackProdConfig = require('./webpack.prod');
const webpackBin = './node_modules/.bin/webpack';
const webpackThemePath = path.join(__dirname, 'themes/hugulpack');
const runSeq = require('run-sequence');


// browsersync dev server
// gulp.task('server', ['build'], () => {
//     browserSync.init({
//         server: {
//             baseDir: "./dist"
//         }
//     });
//     gulp.watch(['./src/js/**/*', './src/scss/**/*'], () => { 
//         gulp.start('build', () => {
//             browserSync.reload();
//         });
//     });
// });


// hugo server and webpack --watch
gulp.task('dev', (cb) => {
    // start webpack
    let config = Object.assign({}, webpackDevConfig);
    let compiler = webpack(config)
    compiler.watch({}, (err, stats) => {
        log(chalk.green(stats))
    })
    // start hugo
    spawn('hugo', ['server'], { cwd: 'src/site', stdio: 'inherit'}, (err) => {
        if (err) return cb(err);
        cb();
    })
});


// some of the build tasks below need redone and renamed
// 
// 
// 
// build site
// 1. clean ./dist/js|css
gulp.task('clean:dist', (cb) => {
    return del(['./dist/js', './dist/css'], () => {
        cb();
    });
})

// 2. run webpack
// gulp.task('webpack',  (cb) => {
//     let config = Object.assign({}, webpackDevConfig);
    
//     return webpack(config, (err, stats) => {
//         if (err) {
//             new Error(err.message);
//         }
//         log(chalk.green('webpacked'));
//         cb();
//     });
// });
// 3. run hugo
gulp.task('hugo', () => {
    let hugoArgs = ['-d', '../../dist', '-s', './'];

    return spawn('hugo', hugoArgs, {
        cwd: './src/site'
    });
});
// gulp.task('build', (cb) => {
//     runSeq('webpack', 'hugo', () => {
//         log(chalk.green('build complete'));
//         cb();
//     })
// });

// build for production
// 1. webpack - uglifyjs and css min
gulp.task('webpack:prod',  (cb) => {
    let config = Object.assign({}, webpackProdConfig);
    
    return webpack(config, (err, stats) => {
        if (err) {
            new Error(err.message);
        }
        log(chalk.green('webpacked'));
        cb();
    });
});
// 2. then hugo
gulp.task('build', (cb) => {
    runSeq('webpack:prod', 'hugo', () => {
        log(chalk.green('production build complete'));
        cb();
    })
});


gulp.task('default', ['dev'], () => {});