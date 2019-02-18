'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(gulp);
var buildConfig = build.getConfig();
var karmaTaskCandidates = buildConfig.uniqueTasks.filter((t) => t.name === 'karma');
if(karmaTaskCandidates && karmaTaskCandidates.length > 0) {
  var karmaTask = karmaTaskCandidates[0];
  karmaTask.taskConfig.configPath = './config/karma.config.js';
}
