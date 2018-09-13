"use strict";

// Base Yeoman generator
const Generator = require('yeoman-generator');

// filesystem
const fs = require('fs');

// importing utilities
const util = require('../../lib/util.js');

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


    writing() {}

    install() {
        // deployes additional files to the project directory
        this._deployFiles();
        // add external to the configuration
        this._addExternals();
        // add all package depenedencies configured in addonConfig.json.
        this._addPackageDependencies();
        // inject custom tasks to gulpfile
        this._injectToGulpFile();
        // Update add templates
        util.deployTemplates(this);
        // finally run install
        util.runInstall(this);

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {

    }

    _deployFiles() {

        this.fs.copy(
            this.templatePath('config/copy-static-assets.json'),
            this.destinationPath('config/copy-static-assets.json')
        )

    }

    _addExternals() {

        // reading JSON
        let config = JSON.parse(
            fs.readFileSync(this.destinationPath('config/config.json'))
        );

        if (config.externals !== undefined) {
            // Add Handlebars entry
            config.externals.handlebars = "./node_modules/handlebars/dist/handlebars.amd.min.js";

            // writing json
            try {
                fs.writeFileSync(
                    this.destinationPath('config/config.json'),
                    JSON.stringify(config, null, 2)
                );
            } catch (error) {
                console.log(error);
            }
        }

    }

    _addPackageDependencies() {
        util.addPackageDependencies(this, ['handlebars']);
    }

    _injectToGulpFile() {
        util.injectToGulpFile(this);
    }

}
