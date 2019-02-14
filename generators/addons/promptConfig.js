const chalk = require('chalk');
const utils = require('../../lib/util');

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

// currently not used trimmdown
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

// ReactJS libraries only
const reactLibs = [{
    name: 'PnP Reusable Controls',
    value: '@pnp/spfx-controls-react'
}];

// Vetting options
const vettingOptions = [{
        name: 'WebPack Bundle Analyzer',
        value: 'webpack-analyzer'
    },
    {
        name: 'Style Linter',
        value: 'stylelint'
    }
]

// SharePoint Online supported libraries
const spoLibs = [{
        name: 'jQuery',
        value: 'jquery'
    }, {
        name: 'pnpjs',
        value: '@pnp/pnpjs'
    }, {
        name: 'PnP Property Controls',
        value: '@pnp/spfx-property-controls'
    }
    // Add a new configuration object in here
]

// On premises supported libraries
const onpremLibs = [{
        name: 'jQuery',
        value: 'jquery'
    }, {
        name: 'pnpjs',
        value: '@pnp/pnpjs'
    }
    // Add a new configuration object in here
]

// generat configuration options
const configOptions = [
    // Library selection
    {
        type: 'checkbox',
        message: 'Which libraries to include ?',
        name: 'jsLibrary',
        choices: answers => {

            let defaultLibs = [];

            // Select supported libraries base on enviroment
            switch (answers.spfxenv) {
                case 'onprem':
                    defaultLibs = onpremLibs;
                    break;
                case 'onprem19':
                case 'spo':
                    defaultLibs = spoLibs;
                    if (answers.framework === "react" ||
                        answers.framework === "reactjs.plus"
                    ) {
                        defaultLibs = defaultLibs.concat(reactLibs)
                    }
                    break;
                default:
                    break;

            }

            return defaultLibs;

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
