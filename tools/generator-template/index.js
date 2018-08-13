// Base Yeoman generator
const Generator = require('yeoman-generator');
// prompt configuration
const prompts = require('./promptConfig');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);
        // configuration of user prompt

    }

    // Initialisation geenerator
    initializing() {

    }

    // Prompt for user input for Custom Generator
    prompting() {

    }

    // adds additonal editor support in this case CSS Comb
    configuring() {
        // Currently not supported don't use this
    }

    // adds additonal editor support in this case CSS Comb
    writing() {
        // Currently not supported don't use this
    }

    // adds additonal editor support in this case CSS Comb
    install() {

        /**
         * Place your custom deployment code in here
         */

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {
        // Currently not supported don't use this
    }

}