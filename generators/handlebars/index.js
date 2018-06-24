// Base Yeoman generator
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    // Initialisation geenerator
    initializing() {
        
    }

    // Prompt for user input for Custom Generator
    prompting() {

    }

    // adds additonal editor support in this case CSS Comb
    configuring() {

    }


    writing() {
        
    }

    install() {

        // Copy static assets
        // this.fs.copy(
        //     this.templatePath('config/copy-static-assets.js'),
        //     this.destinationPath('config/copy-static-assets.js')
        // );

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {

    }

}