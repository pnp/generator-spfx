const configOptions = [
    // Library selection
    {
        type: 'checkbox',
        message: 'Which libraries to include',
        name: 'jsLibrary',
        choices: [
            "jQuery",
            "pnpjs"
        ]
    },
    // jQuery version selection
    {
        type: 'list',
        message: "Which version of jQuery to include",
        name: 'jQueryVersion',
        choices: [{
                'name': '2.x.x',
                'value': '2.0.0'
            },
            {
                'name': '3.x.x (recommended)',
                'value': '3.0.0',
                default: true
            },
        ],
        when: answers => answers.jsLibrary.indexOf('jQuery') !== -1
    }
]

const jqueryOptions = [{
        key: '2.0.0',
        name: '2.x.x'
    },
    {
        key: '3.0.0',
        name: '3.x.x (recommended)'
    }
]

const promptConfig = {
    config: configOptions,
    options: {
        jQuery: jqueryOptions
    }
}

module.exports = promptConfig;
// when: answers => answers.features.indexOf('includeBootstrap') === -1