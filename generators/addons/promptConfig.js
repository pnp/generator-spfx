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
    'name': '6.x.x',
    'value': '6'
}, {
    'name': '6.x.x incl. Fluent Theme',
    'value': '6fluent'
}]

const rushCompilerOption = [{
        'name': 'TypeScript v2.9',
        'value': 'rush@2.9'
    },
    {
        'name': 'TypeScript v3.0',
        'value': 'rush@3.0'
    },
    {
        'name': 'TypeScript v3.1',
        'value': 'rush@3.1'
    },
    {
        'name': 'TypeScript v3.2',
        'value': 'rush@3.2'
    },
    {
        'name': 'TypeScript v3.3 - Default',
        'value': 'rush@3.3',
        default: true
    },
    {
        'name': 'TypeScript v3.4',
        'value': 'rush@3.4'
    },
    {
        'name': 'TypeScript v3.5',
        'value': 'rush@3.5'
    }
]

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
    },
    {
        name: 'CSS Comb',
        value: 'csscomb'
    }
];

// continuous integrations options
const ciOptions = [{
        name: 'None',
        value: 'no-devops'
    }, {
        name: 'Azure DevOps',
        value: 'azure'
    },
    {
        name: 'Azure DevOps Multi-Stage Pipeline with deployment (preview)',
        value: 'azure-preview'
    }
];

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
    },
    {
        name: 'spfx-uifabric-themes - enhanced theming support',
        value: 'spfx-uifabric-themes'
    },
    {
        name: 'lodash',
        value: 'lodash'
    }
    // Add a new configuration object in here
]

// On premises supported libraries
const onpremLibs = [{
        name: 'jQuery',
        value: 'jquery@3'
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
                    if (answers.framework === 'react' ||
                        answers.framework === 'reactjs.plus'
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
    {
        type: 'list',
        message: `${chalk.bold.yellow('TypeScript: ')} Please choose a version:`,
        name: 'typescript',
        choices: rushCompilerOption,
        when: answers => answers.spfxenv !== undefined && answers.spfxenv === 'spo'
    },
    // Vetting and code style options
    {
        type: 'checkbox',
        message: 'Vetting Options',
        name: 'vetting',
        choices: vettingOptions
    },
    {
        type: 'list',
        message: 'Include pipeline configuration?',
        name: 'continuousIntegration',
        choices: ciOptions
    }
]

// export options as module
module.exports = configOptions;
