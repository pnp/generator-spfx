const inquirer = require('inquirer');
const chalk = require('chalk');
const utils = require('../lib/util');
const fgYellow = chalk.whiteBright.bold;

let angularVersion = "";

// check if @angular/cli is installed - otherwise disable this option
const checkAngular = (() => {

    try {
        const ngVersion = require('@angular/cli/package.json');
        
        // support for Angular 6 and all above versions
        if ((+ngVersion.version.split('.')[0]) >= 6) {
            angularVersion = ` (uses @angular/cli ${ngVersion.version})`;
            return false;
        };

        return true;

    } catch (error) {

        // Angular is disabled because no Valid client could be found
        return true;

    }

})();

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
        name: '- Aurelia',
        value: 'aurelia'
    },
    {
        name: '- Angular Elements' + angularVersion,
        value: 'angularelements',
        disabled: checkAngular
    },
    {
        name: '- Handlebars',
        value: 'handlebars'
    },
    {
        name: '- Vue.js',
        value: 'vuejs'
    },
    new inquirer.Separator(
        fgYellow('Enhanced SPFx')
    ),
    {
        name: '- ReactJS',
        value: 'reactjs.plus'
    },
    // {
    //     name: '- Knockout (deprecated)',
    //     value: 'knockout.plus'
    // },
    {
        name: '- No Framework',
        value: 'none.plus'
    }
];

// SharePoint Online and on-premise 2019 supported frameworks
const onPrem19Frameworks = [
    new inquirer.Separator(
        fgYellow('Additional Frameworks')
    ),
    {
        name: '- Angular Elements' + angularVersion,
        value: 'angularelements',
        disabled: checkAngular
    },
    {
        name: '- Aurelia',
        value: 'aurelia'
    },
    {
        name: '- Handlebars',
        value: 'handlebars'
    },
    new inquirer.Separator(
        fgYellow('Enhanced SPFx')
    ),
    {
        name: '- ReactJS',
        value: 'reactjs.plus'
    },
    // {
    //     name: '- Knockout (deprecated)',
    //     value: 'knockout.plus'
    // },
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
    // {
    //     name: '- Knockout (deprecated)',
    //     value: 'knockout.plus'
    // },
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
                    return onPrem19Frameworks;
                case 'spo':
                    return spoFrameworks;
                default: // default to spo, but should log error here
                    return spoFrameworks;
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

// Add configuration of Aurelia generator
const aurelia = require('../generators/aurelia/promptConfig');
configOptions = configOptions.concat(aurelia);

// Add configuration of reactjs.plus generator
const reactplus = require('../generators/reactjs.plus/promptConfig');
configOptions = configOptions.concat(reactplus);

// Add configuration of No famework generator
const noframework = require('../generators/noframework.plus/promptConfig');
configOptions = configOptions.concat(noframework);

const promptConfig = () => {

    // return questions based on the environmen command line switch
    const _getConfigOptions = (environment) => {

        if (environment === undefined) {

            // embed environment selection into questions
            return environmentOptions.concat(configOptions);

        } else {

            // auto-set option when environment command line switch was used
            environmentOptions[0].when = answers => {
                answers.spfxenv = environment;
                return false;
            }

            return environmentOptions.concat(configOptions);

        }

    }

    return {
        config: _getConfigOptions
    }

};

module.exports = promptConfig();
