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

            console.log('if :::::---:::::', answers.framework);
            return answers.framework && answers.framework === 'reactjs.plus'
        }
    }
    // , addon
]

module.exports = configOptions;
