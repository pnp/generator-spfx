'use strict';

// Base Yeoman generator
const Generator = require('yeoman-generator');
// filesystem
const fs = require('fs');

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
        
        console.log(this.options);

        let config = this.fs.readJSON(
            this.destinationPath('package.json')
        );

        
        
    }

    end() {
        console.log('>>> END: addon');
    }

}