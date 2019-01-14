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
        name: '- ReactJS',
        value: 'reactjs.plus'
    },
    {
        name: '- Knockout',
        value: 'knockout.plus'
    },
    {
        name: '- No Framework',
        value: 'none.plus'
    },
    new inquirer.Separator(
        fgYellow('Additional Frameworks')
    ),
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
