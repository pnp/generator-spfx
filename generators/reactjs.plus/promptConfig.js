"use strict"

// These are just sample selection of options
const options = [{
    name: 'Jest',
    value: 'jest'
}
];

// fast serve options
const fastServeOptions = [
    {
        name: 'None',
        value: 'no-fast-serve'
    },
    {
        name: 'SPFx Fast Serve (for web parts and extensions)',
        value: 'spfx-fast-serve'
    },
];


const configOptions = [
    // Sample content of questions
    {
        type: 'checkbox',
        message: 'Test Framework',
        name: 'testframework',
        choices: options,
        when: answers => {
            return answers.framework && answers.framework === 'reactjs.plus'
        }

    },
    {
        type: 'list',
        message: 'Configure SPFx Fast Serve?',
        name: 'fastServe',
        choices: fastServeOptions,
        when: answers => {
            return answers.framework && answers.framework === 'reactjs.plus'
        }
    },
    // , addon
]

module.exports = configOptions;
