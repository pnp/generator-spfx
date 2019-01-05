const inquirer = require('inquirer');
const chalk = require('chalk');

const fgYellow = chalk.whiteBright.bold;

// Currently supported framework
const supportedFrameworks = [
    {
        name: 'Handlebars',
        value: 'handlebars'
    },
    {
        name: 'Vue.js',
        value: 'vuejs'
    },
    new inquirer.Separator(
        fgYellow('Experimental')
    ),
    {
        name: fgYellow('- Angular Elements'),
        value: 'angularelements'
    },
    new inquirer.Separator(
        fgYellow('Enhanced SPFx')
    ),
    {
        name: '- ReactJS Plus',
        value: 'reactjs.plus'
    },
    {
        name: '- Knockout Plus',
        value: 'knockout.plus'
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
configOptions = configOptions.concat(addon);

const angularElements = require('../generators/angularelements/promptConfig');
configOptions = configOptions.concat(angularElements);

const vuejs = require('../generators/vuejs/promptConfig');
configOptions = configOptions.concat(vuejs);

const reactplus = require('../generators/reactjs.plus/promptConfig');
configOptions = configOptions.concat(reactplus);

const promptConfig = {
    config: configOptions
};

module.exports = promptConfig;
