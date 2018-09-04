const chalk = require('chalk');

// jQuery version options
const jqueryOptions = [{
        'name': '3.x.x (recommended)',
        'value': 3
    },
    {
        'name': '2.x.x',
        'value': 2
    }
]

const pnpJsOptions = [{
        'name': '@pnp/common',
        'value': '@pnp/common'
    },
    {
        'name': '@pnp/config-store',
        'value': '@pnp/config-store'
    },
    {
        'name': '@pnp/graph',
        'value': '@pnp/graph'
    },
    {
        'name': '@pnp/logging',
        'value': '@pnp/logging'
    },
    {
        'name': '@pnp/odata',
        'value': '@pnp/odata'
    },
    {
        'name': '@pnp/sp',
        'value': '@pnp/sp'
    },
    {
        'name': '@pnp/sp-taxonomy',
        'value': '@pnp/sp-taxonomy'
    }
]

// generat configuration options
const configOptions = [
    // Library selection
    {
        type: 'checkbox',
        message: 'Which libraries to include',
        name: 'jsLibrary',
        choices: [{
                name: 'jQuery',
                value: 'jquery'
            }, {
                name: 'pnpjs',
                value: '@pnp/pnpjs'
            }
            // Add a new configuration object in here
        ]
    },
    // jQuery version selection
    {
        type: 'list',
        message: `${chalk.bold.yellow('jQuery: ')} Please choose a version:`,
        name: 'jQueryVersion',
        choices: jqueryOptions,
        // Show only when jQuery was included
        when: answers => answers.jsLibrary.indexOf('jquery') !== -1
    }
]

// export options as module
module.exports = configOptions;
