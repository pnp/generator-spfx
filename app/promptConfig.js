const inquirer = require('inquirer');
const chalk = require('chalk');
const utils = require('../lib/util');

console.log(this);

const fgYellow = chalk.whiteBright.bold;

const supportedSPFxTargets = [{
        name: 'SharePoint Online only (latest)',
        value: 'spo'
    },
    {
        name: 'SharePoint 2019 onwards, including SharePoint Online',
        value: 'onprem19'
    },
    {
        name: 'SharePoint 2016 onwards, including 2019 and SharePoint Online',
        value: 'onprem'
    }
];

// if environment optiosn have been specified
const environmentOptions = [{
    type: 'list',
    message: 'Which baseline packages do you want to target for your component(s)?',
    name: 'spfxenv',
    choices: supportedSPFxTargets
}];

// SharePoint Online and on-premise 2019 supported frameworks
const spoFrameworks = [
    new inquirer.Separator(
        fgYellow('Additional Frameworks')
    ),
    {
        name: '- Handlebars',
        value: 'handlebars'
    },
    {
        name: '- Vue.js',
        value: 'vuejs'
    },
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
    }
];

// On-premises 2016 frameworks
const onPremFrameworks = [
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
    }
];


let configOptions = [
    // select your framework
    {
        type: 'list',
        message: 'Choose your framework',
        name: 'framework',
        choices: answers => {
            switch (answers.spfxenv) {
                case 'onprem':
                    return onPremFrameworks;
                case 'onprem19':
                case 'spo':
                    return spoFrameworks;
                default:
                    break;
            }
        }
    }
];

// Add configuration of Addon generator
const addon = require('../generators/addons/promptConfig');
configOptions = configOptions.concat(addon);

// Add configuration of angular elements generator
const angularElements = require('../generators/angularelements/promptConfig');
configOptions = configOptions.concat(angularElements);

// Add configuration of Vue.JS generator
const vuejs = require('../generators/vuejs/promptConfig');
configOptions = configOptions.concat(vuejs);

// Add configuration of reactjs.plus generator
const reactplus = require('../generators/reactjs.plus/promptConfig');
configOptions = configOptions.concat(reactplus);

// Add configuration of No famework generator
const noframework = require('../generators/noframework.plus/promptConfig');
configOptions = configOptions.concat(noframework);

const promptConfig = (environmnet) => {

    // return questions based on the environmen command line switch
    const _getConfigOptions = (environment) => {

        if (environment === undefined) {

            // embed environment selection into questions
            return environmentOptions.concat(configOptions);

        } else {

            // auto-set option when environment when command line switch was used
            environmentOptions[0].when = answers => {
                answers.spfxenv = environment;
                return false;
            }

            // return environmentOptions.concat(configOptions);

        }

    }

    return {
        config: _getConfigOptions
    }

};

module.exports = promptConfig();
