'use strict';

// Base Yeoman generator
const Generator = require('yeoman-generator');

// filesystem
const fs = require('fs');

const util = require('../../lib/util.js');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

    }

    // Initialisation generator
    initializing() {

    }

    prompting() {}

    configuring() {}

    writing() {}

    install() {

        this._addPackageDependencies();


        if (undefined !== this.options.vetting &&
            this.options.vetting.indexOf('stylelint') !== -1) {

            this._addStylelintConfig();
        }

        if (undefined !== this.options.ci &&
            this.options.ci.indexOf('azure') !== -1) {

            this._addContinuousConfig();
        }

        this._addToolScripts();


    }

    end() {

    }

    _addToolScripts(){

        this.fs.copy(
            this.templatePath('./tools/pre-version.js'),
            this.destinationPath('./tools/pre-version.js')
        );

    }

    _addPackageDependencies() {

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

            // define all requested libraries
            let requestedLibraries = this.options.libraries === undefined ? [] : this.options.libraries;

            // append vetting options if selected
            requestedLibraries = this.options.vetting === undefined ? requestedLibraries :
                requestedLibraries.concat(this.options.vetting);

            // Append Azure DevOps options if selected
            requestedLibraries = this.options.ci === undefined ? requestedLibraries :
                requestedLibraries.concat('continuousIntegrationKarma');

            // Add gulp-sequence for gulp dist automatically
            requestedLibraries.push('gulp-sequence');

            // merge all options and check if gulpfile is required
            let newPkgConfig = util.mergeAddons(addonConfig, requestedLibraries, config);

            // add pre-version script to package.json
            if (newPkgConfig.scripts !== undefined) {
                // add preversion script
                if (newPkgConfig.scripts.preversion === undefined) {

                    newPkgConfig.scripts.preversion = "node ./tools/pre-version.js";

                } else {

                    newPkgConfig.scripts.preversion += " && node ./tools/pre-version.js";

                }
                // add postversion scripts
                if (newPkgConfig.scripts.postversion === undefined) {

                    newPkgConfig.scripts.postversion = "gulp dist";

                } else {

                    // check if gulp dist not already exists
                    if (newPkgConfig.scripts.postversion.indexOf('gulp dist') === -1) {

                        newPkgConfig.scripts.postversion += " && gulp dist";

                    }

                }

            }

            fs.writeFileSync(
                this.destinationPath('package.json'),
                JSON.stringify(newPkgConfig, null, 2)
            );

        }

    }

    _injectToGulpFile() {

    }

    _addContinuousConfig() {

        // azure deevops configuration
        let adoFileName = 'azure-pipelines.yml';
        // Karma configuration
        let karmaFileDestPath = 'config/karma.config.js';
        let karmaFileSourcePath = 'karma.config.js';

        this.fs.copy(
            this.templatePath(adoFileName),
            this.destinationPath(adoFileName)
        );

        this.fs.copy(
            this.templatePath(karmaFileSourcePath),
            this.destinationPath(karmaFileDestPath)
        );

    }

    _addStylelintConfig() {

        this.fs.copy(
            this.templatePath('.stylelintrc'),
            this.destinationPath('.stylelintrc')
        );

    }

}
