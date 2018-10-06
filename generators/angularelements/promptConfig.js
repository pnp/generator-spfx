"use strict"

const path = require('path');
const process = require('process');
const _ = require('lodash');

// check if user want to have exntend linking capability
const configOptions = [
    {
        type: 'input',
        message: 'What is your solution name?',
        name: 'solutionName',
        when: (answers) => answers.framework === 'angularelements',
        default: _.kebabCase(path.basename(process.cwd()))
    },
    {
        type: 'input',
        message: 'Angular CLI options',
        name: 'angularCliOptions',
        when: (answers) => answers.framework === 'angularelements',
        default: '--style=scss --skip-git --skip-install'
    }
]

module.exports = configOptions;
