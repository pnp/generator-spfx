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

    // Initialisation geenerator
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

            this._injectToGulpFile();
        }

    }

    end() {

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

            // let jsAddons = this.options.libaries;
            let requestedLibraries =
                (undefined !== this.options.vetting &&
                    this.options.vetting.length !== 0) ? this.options.libraries.concat(this.options.vetting) : this.options.libraries;

            let newPkgConfig = util.mergeAddons(addonConfig, requestedLibraries, config);

            fs.writeFileSync(
                this.destinationPath('package.json'),
                JSON.stringify(newPkgConfig, null, 2)
            );

        }

    }

    _injectToGulpFile() {

        // let targetGulpFile = this.destinationPath('gulpfile.js');

        // if (fs.existsSync(targetGulpFile)) {

        //     let coreGulpTemplate = this.templatePath('../../../app/templates/gulpfile.js');
        //     let customGulpTemplate = this.templatePath('./gulpfile.js');


        //     try {

        //         util.composeGulpFile(coreGulpTemplate, customGulpTemplate, targetGulpFile);

        //     } catch (error) {

        //         this.log(error);

        //     }

        // }
    }

    _addStylelintConfig() {

        if (!fs.existsSync(this.destinationPath('.stylelintrc'))) {

            this.fs.copy(
                this.templatePath('.stylelintrc'),
                this.destinationPath('.stylelintrc')
            );

        }
    }

}
