<%= SpfxOptions %>
<%

var allGulpTasks = [];

if (undefined !== SpfxOptions) {

    // Check for webpack bundle analyzer
    if(SpfxOptions['pnp-vetting'].indexOf('webpack-analyzer') !== -1){

        let gulptaskPath = options.path+'webpack-bunde-analyzer.js';

        allGulpTasks.push({
            name: 'webpack-bundle-analyzer',
            path: gulptaskPath,
            data: {}
        });

    }

    if(SpfxOptions['pnp-vetting'].indexOf('stylelint') !== -1){

        let gulptaskPath = options.path+'stylelint.js';

        allGulpTasks.push({
            name: 'webpack-bundle-analyzer',
            path: gulptaskPath,
            data: {}
        });

    }

}

%>
'use strict';
const path = require('path');
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

<% allGulpTasks.forEach(element => {%>
<%- include(element.path, element.data); _%>
<% }); %>

/**
 * Custom Framework Specific gulp tasks
 */
<%- customTasks %>

build.initialize(gulp);
