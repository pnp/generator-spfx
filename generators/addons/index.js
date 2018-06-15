// Base Yeoman generator
const Generator = require('yeoman-generator');

const promptConfig = require('./promptConfig');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    // Initialisation geenerator
    initializing() {

    }

    prompting() {

        this.prompt(promptConfig.config)
            .then(answers => {
                console.log(answers);
            });
    }

    configuring() {

    }

    writing() {

    }

    install() {

    }

    install() {

    }

    end() {

    }

}