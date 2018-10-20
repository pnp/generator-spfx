const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const process = require('process');
const _ = require('lodash');

const fgYellow = chalk.whiteBright.bold;

// Currently supported framework
const supportedFrameworks = [
    {
        name: 'Handlebars',
        value: 'handlebars'
    },
    {
<<<<<<< HEAD
        name: 'Vue.js',
        value: 'vuejs'
=======
        name: 'Angular Elements (experimental)',
        value: 'angularelements'
>>>>>>> d5d4edf... Several changes and fixes for Angular Elements generator
    },
    new inquirer.Separator(
        fgYellow('Default SPFx')
    ),
    {
        name: '- ReactJS',
        value: 'react'
    },
    {
        name: '- Knockout',
        value: 'knockout'
    },
    {
        name: '- No Framework',
        value: 'noframework'
    }
];

let configOptions = [
    // select your framework
    {
        type: 'list',
        message: 'Choose your framework',
        name: 'framework',
        choices: supportedFrameworks
    }
]

// Add configuration of Addon generator
const addon = require('../generators/addons/promptConfig');
configOptions = configOptions.concat(addon,
    {
        type: 'input',
        message: 'What is your solution name?',
        name: 'solutionName',
        when: (answers) => answers.framework === 'angularelements',
        default: _.kebabCase(path.basename(process.cwd()))
    }
);

// Add configuration of Addon generator
const vuejs = require('../generators/vuejs/promptConfig');
configOptions = configOptions.concat(vuejs);

const promptConfig = {
    config: configOptions
};

module.exports = promptConfig;
