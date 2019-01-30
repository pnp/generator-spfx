<%

var allGulpTasks = [];

var webpackBundleAnalyzer = false;
var stylelint = false;

if (undefined !== SpfxOptions) {

    // Check for webpack bundle analyzer
    if(SpfxOptions['pnp-vetting'].indexOf('webpack-analyzer') !== -1){
        webpackBundleAnalyzer = true;
    }

    if(SpfxOptions['pnp-vetting'].indexOf('stylelint') !== -1){
        stylelint = true;
    }

}

%>
'use strict';
const path = require('path');
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

<% if(webpackBundleAnalyzer) {%>
/**
 * Webpack Bundle Anlayzer
 * Reference and gulp task
 */
const bundleAnalyzer = require('webpack-bundle-analyzer');

build.configureWebpack.mergeConfig({

    additionalConfiguration: (generatedConfiguration) => {
        const lastDirName = path.basename(__dirname);
        const dropPath = path.join(__dirname, 'temp', 'stats');
        generatedConfiguration.plugins.push(new bundleAnalyzer.BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
            generateStatsFile: true,
            statsFilename: path.join(dropPath, `${lastDirName}.stats.json`),
            logLevel: 'error'
        }));

        return generatedConfiguration;
    }

});
<% }; %>
<% if(webpackBundleAnalyzer) {%>
/**
 * StyleLinter configuration
 * Reference and custom gulp task
 */
const stylelint = require('gulp-stylelint');

/* Stylelinter sub task */
let styleLintSubTask = build.subTask('stylelint', (gulp) => {

    console.log('[stylelint]: By default style lint errors will not break your build. If you want to change this behaviour, modify failAfterError parameter in gulpfile.js.');

    return gulp
        .src('src/**/*.scss')
        .pipe(stylelint({
            failAfterError: false,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
/* end sub task */

build.rig.addPreBuildTask(styleLintSubTask);
<% }; %>

/**
 * Custom Framework Specific gulp tasks
 */
<%- customTasks %>

build.initialize(gulp);
