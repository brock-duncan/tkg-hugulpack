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

// webpack --watch / hugo server 
gulp.task('dev', (cb) => {
    // start webpack and watch
    let config = Object.assign({}, webpackDevConfig);
    let compiler = webpack(config)
    compiler.watch({}, (err, stats) => {
        log(chalk.green(stats))
    })
    // start hugo server
    spawn('hugo', ['server', '-D'], { cwd: 'src/site', stdio: 'inherit'}, (err) => {
        if (err) return cb(err);
        cb();
    })
});

// 
// build for production
// 
// 1. webpack - uglifyjs and css min
gulp.task('webpack:prod',  (cb) => {
    let config = Object.assign({}, webpackProdConfig);
    
    return webpack(config, (err, stats) => {
        if (err) new Error(err.message);
        log(chalk.green('webpacked'));
        cb();
    });
});
// 2. then hugo
gulp.task('hugo', (cb) => {
    let hugoArgs = ['-d', '../../dist', '-s', './'];

    spawn('hugo', hugoArgs, {
        cwd: './src/site'
    });
    cb();
});
// 3. build
gulp.task('build', (cb) => {
    runSeq('webpack:prod', 'hugo', () => {
        log(chalk.green('production build complete'));
        cb();
    })
});
// default
gulp.task('default', ['dev'], () => {});