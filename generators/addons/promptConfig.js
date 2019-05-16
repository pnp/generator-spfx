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

const ouifrOptions = [{
    'name': '5.x.x (recommended)',
    'value': '5'
}, {
    'name': '6.x.x',
    'value': '6'
}, {
    'name': '6.x.x - Fluent',
    'value': '6fluent'
}]

// ReactJS libraries only
const reactLibs = [{
    name: 'PnP Reusable Controls',
    value: '@pnp/spfx-controls-react'
}, {
    name: 'Office UI Fabric',
    value: 'ouifr'
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
];

// continuous integrations options
const ciOptions = [{
    name: 'Azure DevOps',
    value: 'azure'
}];

// SharePoint Online supported libraries
const spoLibs = [{
        name: 'jQuery',
        value: 'jquery@3'
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

            // Select supported libraries base on environment
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
    {
        type: 'list',
        message: `${chalk.bold.yellow('Office UI Fabric: ')} Please choose a version:`,
        name: 'ouifrVersion',
        choices: ouifrOptions,
        // Show only when jQuery was included
        when: answers => answers.jsLibrary !== undefined && answers.jsLibrary.indexOf('ouifr') !== -1
    },
    // Vetting and code style options
    {
        type: 'checkbox',
        message: 'Vetting Options',
        name: 'vetting',
        choices: vettingOptions
    },
    {
        type: 'checkbox',
        message: 'Include pipeline configuration?',
        name: 'continuousIntegration',
        choices: ciOptions
    }
]

// export options as module
module.exports = configOptions;
