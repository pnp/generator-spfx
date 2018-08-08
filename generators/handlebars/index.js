"use strict";

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

        this._deployFiles();
        this._addExternals();
        this._addPackageDependencies();

    }

    _deployFiles(){

        this.fs.copy(
            this.templatePath('config/copy-static-assets.js'),
            this.destinationPath('config/copy-static-assets.js')
        )

    }

    _addExternals() {

        // reading JSON
        let config = this.fs.readJSON(this.destinationPath('config/config.json'));

        // Add Handlebars entry
        config.externals.handlebars = "./node_modules/handlebars/dist/handlebars.amd.min.js";

        // writing json
        fs.writeFileSync(
            this.destinationPath('config/config.json'),
            JSON.stringify(config, null, 2));

    }

    _addPackageDependencies(){
        if (fs.existsSync(this.destinationPath('package.json'))) {

            let config = JSON.parse(fs.readFileSync(
                this.destinationPath('package.json')
            ));

            // request current addon configuration
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

            var requestedLibraries = ['handlebars'];

            var newPkgConfig = util.mergeAddons(addonConfig, requestedLibraries, config);
                        
            fs.writeFileSync(
                this.destinationPath('package.json'),
                JSON.stringify(newPkgConfig, null, 2)
            );

        }
    }
}