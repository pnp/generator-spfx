"use strict";

// Base Yeoman generator
const Generator = require('yeoman-generator');

// filesystem
const fs = require('fs');

// importing utilities
const util = require('../../lib/util.js');

// Information injected in the readme file
const readmeInfo = {
    libraryName: '', // Placeholder for project name
    techStack: 'This project uses [React](https://reactjs.org).'
};

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

        // include JEST testing if requestd
        if (this.options.testFramework !== undefined &&
            this.options.testFramework.indexOf('jest') !== -1) {

            let reactVersion = util.detectReactVersion(this);

            // add all package depenedencies configured in addonConfig.json.
            this._addPackageDependencies(reactVersion);
        }

        // inject custom tasks to gulpfile
        this._injectToGulpFile();

        // Updated Readme info
        util.updateReadmeFile(this, readmeInfo);

        // run installation
        util.runInstall(this);

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {

    }

    _deployFiles() {

    }

    _addExternals() {

    }

    _addPackageDependencies(reactVersion) {

        if (fs.existsSync(this.destinationPath('package.json'))) {

            // request the default package file
            let config;

            try {
                config = JSON.parse(fs.readFileSync(
                    this.destinationPath('package.json')
                ));

            } catch (error) {

                throw error;

            }

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

            // select the requested libraried
            let requestedLibraries = [reactVersion];

            // declare new package config file
            let newPkgConfig;

            try {

                newPkgConfig = util.mergeAddons(addonConfig, requestedLibraries, config);

            } catch (error) {

                throw error

            }

            // if content could be added to the new package.json write it
            if (newPkgConfig !== undefined && newPkgConfig !== null) {

                fs.writeFileSync(
                    this.destinationPath('package.json'),
                    JSON.stringify(newPkgConfig, null, 2)
                );

            } else {

                throw 'Updated package.json file is invalid.';

            }

        }

    }

    _injectToGulpFile() {

        let targetGulpFile = this.destinationPath('gulpfile.js');

        if (fs.existsSync(targetGulpFile)) {

            let coreGulpTemplate = this.templatePath('../../../app/templates/gulpfile.js');
            let customGulpTemplate = this.templatePath('./gulpfile.js');

            try {

                util.composeGulpFile(coreGulpTemplate, customGulpTemplate, targetGulpFile, this.options);

            } catch (error) {

                this.log(error);

            }

        }

    }

}
