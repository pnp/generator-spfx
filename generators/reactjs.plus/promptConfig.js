"use strict"

// These are just sample selection of options
const options = [{
        name: 'Jest',
        value: 'jest'
    }
];

const configOptions = [
    // Sample content of questions
    {
        type: 'list',
        message: 'Test Framework',
        name: 'testframework',
        choices: options,
        when: answers => {

            console.log(answers);
            answers.framework && answers.framework === 'react.plus';
            return true;

        }
    }
    // , addon
]

module.exports = configOptions;
