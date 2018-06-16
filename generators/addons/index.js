// Base Yeoman generator
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

    }

    // Initialisation geenerator
    initializing() {

    }

    prompting() {
        console.log('>>> PROMPTIN: addon');
    }

    configuring() {
        console.log('>>> CONFIG: addon');
    }

    writing() {
        console.log('>>> WRITING: addon');
    }

    install() {
        console.log('>>> INSTALL: addon');
    }

    end() {
        console.log('>>> END: addon');
    }

}