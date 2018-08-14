"use strict"

// These are just sample selection of options
const options = [{
        name: 'Option A',
        value: 'option-a'
    },
    {
        name: 'Option B',
        value: 'option-b'
    }
];

const configOptions = [
    // Sample content of questions
    {
        type: 'list',
        message: 'Please add your options in here',
        name: 'youroptions',
        choices: options
    }
    // , addon
]

const promptConfig = {
    config: configOptions
}

module.exports = promptConfig;