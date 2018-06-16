// Base Yeoman generator
const Generator = require('yeoman-generator');

const prompts = require('./promptConfig');


module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);
        // configuration of user prompt

    }

    // Initialisation geenerator
    initializing() {
        // integrate addon generator
    }

    // Prompt for user input for Custom Generator
    prompting() {

    }

    // adds additonal editor support in this case CSS Comb
    configuring() {

    }

    // adds additonal editor support in this case CSS Comb
    writing() {

    }

    // adds additonal editor support in this case CSS Comb
    install() {

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {

    }

}