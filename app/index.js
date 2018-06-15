// Base Yeoman generator
const Generator = require('yeoman-generator');

const help = require('./help');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        if(args.indexOf('--help') || args.indexOf('-h')){
            this._showHelp();
        }

    }

    // Initialisation geenerator
    initializing() {}

    // Prompt for user input for Custom Generator
    prompting() {}

    // adds additonal editor support in this case CSS Comb
    configuring() {}


    writing() {}

    install() {

    }

    install() {

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {

    }

    _showHelp(){
        console.log("Show Help");
        console.log(help.cmdOptions);
    }

}