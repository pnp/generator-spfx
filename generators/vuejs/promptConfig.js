"use strict"

// check if user want to have exntend linking capability
const configOptions = [
    {
        type: 'confirm',
        message: 'TSLint extended (slower, use TSLint syntactic check in Vue.js files):',
        name: 'tsLint',
        default: false,
        when: answers => answers.framework && answers.framework === 'vuejs'
    }
]

module.exports = configOptions;
