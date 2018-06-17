const chalk = require('chalk');

const jqueryOptions = [{
        'name': '3.x.x (recommended)',
        'value': 3,
        default: true
    },
    {
        'name': '2.x.x',
        'value': 2
    }
]

const configOptions = [
    // Library selection
    {
        type: 'checkbox',
        message: 'Which libraries to include',
        name: 'jsLibrary',
        choices: [{
            name: "jQuery",
            value: "jquery"
        }, {
            name: "pnpjs",
            value: "@pnp/pnpjs"
        }]
    },
    // jQuery version selection
    {
        type: 'list',
        message: `${chalk.bold.yellow('jQuery: ')} Please choose a version:`,
        name: 'jQueryVersion',
        choices: jqueryOptions,
        when: answers => answers.jsLibrary.indexOf('jquery') !== -1
    }
]

module.exports = configOptions;