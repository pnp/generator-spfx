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

        console.log('>>> END: install');

        let config = this.fs.readJSON(
            this.destinationPath('package.json')
        );

        console.log(config);

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

        let jsAddons = this.options.libaries;

        var requestedLibraries = this.options.libraries;

        // add addons to new package.json
        // var newPkgConfig = this._mergeAddons(addonConfig, requestedLibraries, config);
        var newPkgConfig = util.mergeAddons(addonConfig, requestedLibraries, config);

        // console.log(
        //     this.destinationPath('package.json')
        // )
        // console.log(
        //     JSON.stringify(newPkgConfig, Object.keys(newPkgConfig).sort(), 2)
        // )

        fs.writeFileSync(
            this.destinationPath('package.json'),
            JSON.stringify(newPkgConfig, null, 2)
        );

    }

    _mergeAddons(addonConfig, requestedLibraries, config) {

        let dependencies = config.dependencies;
        let devDependencies = config.devDependencies;

        for (let key in addonConfig) {

            if (requestedLibraries.indexOf(key)) {
                // inject dependencies
                if (addonConfig[key].dependencies) {

                    for (let depend in addonConfig[key].dependencies) {

                        dependencies[depend] = addonConfig[key].dependencies[depend];

                    }

                }
                // inject dev dependencies
                if (addonConfig[key].devDependencies) {

                    for (let depend in addonConfig[key].devDependencies) {

                        devDependencies[depend] = addonConfig[key].devDependencies[depend];

                    }
                }
                // adding dev dependencies
            }
        }

        // sort package properties
        let sortedDependencies = Object.keys(dependencies).sort();
        let sortedDevDependencies = Object.keys(devDependencies).sort();

        // assing sorted dependencies
        config.dependencies = sortedDependencies;
        config.devDependencies = sortedDevDependencies;

        // return new configuration
        return config;

    }

    end() {
        console.log('>>> END: addon');
    }

}