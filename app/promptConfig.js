const inquirer = require('inquirer');
const chalk = require('chalk');

const fgYellow = chalk.whiteBright.bold;

const supportedFrameworks = [{
        name: 'Handlebars',
        value: 'handlebars'
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
        message: "Choose your framework",
        name: 'framework',
        choices: supportedFrameworks
    }
]

// addon generator
const addon = require('../generators/addons/promptConfig');
configOptions = configOptions.concat(addon);

const promptConfig = {
    config: configOptions
}

module.exports = promptConfig;