const chalk = require('chalk');
const inquirer = require('inquirer');

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

const reactLibs = [{
    name: 'PnP Reusable Controls',
    value: '@pnp/spfx-controls-react'
}];

const vettingOptions = [{
        name: 'WebPack Bundle Analyzer',
        value: 'webpack-analyzer',
        checked: true
    },
    {
        name: 'StyleLint',
        value: 'stylelint'
    }
]

const defaultLibs = [{
        name: 'jQuery',
        value: 'jquery'
    }, {
        name: 'pnpjs',
        value: '@pnp/pnpjs'
    }, {
        name: 'PnP Property Controls',
        value: '@pnp/spfx-property-controls',
        checked: true
    }
    // Add a new configuration object in here
]

// generat configuration options
const configOptions = [
    // Library selection
    {
        type: 'checkbox',
        message: 'Additional features:',
        name: 'features',
        choices: answers => {

            let allChoices = [
                new inquirer.Separator('- Which libraries to include -'),
                ...defaultLibs
            ];

            if (answers.framework === 'react') {
                allChoices = allChoices.concat(reactLibs);
            }

            if (answers.framework === 'react' || answers.framework === 'knockout') {
                allChoices.push(new inquirer.Separator('- Which addons to include -'));
                allChoices.push({
                    name: 'stylelint',
                    value: 'stylelint'
                });
            }

            return allChoices;
        }
    },
    // jQuery version selection
    {
        type: 'list',
        message: `${chalk.bold.yellow('jQuery: ')} Please choose a version:`,
        name: 'jQueryVersion',
        choices: jqueryOptions,
        // Show only when jQuery was included
        when: answers => answers.jsLibrary !== undefined && answers.jsLibrary.indexOf('jquery') !== -1
    },
    // Vetting and code style options
    {
        type: 'checkbox',
        message: 'Vetting Options',
        name: 'vetting',
        choices: vettingOptions
    }
]


// export options as module
module.exports = configOptions;
