<%

var webpackAnalyzer = false;
var stylelint = false;

if (undefined !== SpfxOptions) {

    // Check for webpack bundle analyzer
    if(SpfxOptions['pnp-vetting'].indexOf('webpack-analyzer') !== -1){
        webpackAnalyzer = true;
    }

    if(SpfxOptions['pnp-vetting'].indexOf('stylelint') !== -1){
        stylelint = true;
    }

}

%>'use strict';
const path = require('path');
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

<% if (webpackAnalyzer) { %>
<%- include(`${options.path}/webpack-bunde-analyzer.js`, {}); %>
<% } %>
<% if (stylelint) { %>
<%- include(`${options.path}/stylelint.js`, {}); %>
<% } %>

/**
 * Custom Framework Specific gulp tasks
 */
<%- customTasks %>

build.initialize(gulp);
