'use strict';

// Base Yeoman generator
const Generator = require('yeoman-generator');

// filesystem
const fs = require('fs');

const util = require('../lib/util.js');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

    }

    // Initialisation geenerator
    initializing() {

    }

    prompting() {}

    configuring() {}

    writing() {
    }

    install() {}

    end() {

        if (fs.existsSync(this.destinationPath('package.json'))) {

            // console.log('FS EXISTs');

            let config = JSON.parse(fs.readFileSync(
                this.destinationPath('package.json')
            ));

            // // request current addon configuration
            let addonConfig;

            try {
                addonConfig = JSON.parse(
                    fs.readFileSync(
                        this.templatePath('addonConfig.json')
                    )
                )
            } catch (err) {

                throw err;

            }

            // let jsAddons = this.options.libaries;
            var requestedLibraries = this.options.libraries;

            console.log("requestedLibraries :::::: ", requestedLibraries);

            var newPkgConfig = util.mergeAddons(addonConfig, requestedLibraries, config);
                        
            fs.writeFileSync(
                this.destinationPath('package.json'),
                JSON.stringify(newPkgConfig, null, 2)
            );

        }
        
    }

}