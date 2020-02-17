// Base Yeoman generator
const Generator = require('yeoman-generator');
// import nodejs fs
const fs = require('fs');
// path
const path = require('path');
// import nodejs fs
const util = require('../../lib/util');
const paramCase = require('param-case');
const pascalCase = require('pascalcase');

const readmeInfo = {
    libraryName: '', // Placeholder for project name
    techStack: 'This project uses [Aurelia](https://aurelia.io).'
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


    configuring() {
        // Currently not supported don't use this
    }


    writing() {
        // Currently not supported don't use this
    }


    install() {

        const manifest = util.getComponentManifest(this);

        if (!manifest) {
            return;
        }
        // deploy additional files to the project directory
        this._deployFiles();
        // add all package depenedencies configured in addonConfig.json.
        this._addPackageDependencies();
        // inject custom tasks to gulpfile
        this._injectToGulpFile();
        // remove default scss
        //this._removeWebPartScss();
        // Update/add templates
        const ejsInject = {
            componentNameKebabCase: paramCase(manifest.componentName),
            componentNamePascalCase: pascalCase(manifest.componentName)
        };
        util.deployTemplates(this,ejsInject);
        // Updated Readme info
        util.updateReadmeFile(this, readmeInfo);
        // finally run install
        util.runInstall(this);

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {
        // Currently not supported don't use this
    }

    _deployFiles() {

        // this.fs.copy(
        //     this.templatePath('config/copy-static-assets.json'),
        //     this.destinationPath('config/copy-static-assets.json')
        // )

    }

    // _removeWebPartScss() {

    //     // this file is created by OOTB SPFx generator.
    //     // we don't need it in Vue web part.

    //     const manifest = util.getComponentManifest(this);

    //     if (manifest === null) {
    //         return;
    //     }

    //     let targetFile = this.destinationPath(
    //         path.join(
    //             manifest.componentPath,
    //             `${manifest.componentClassName}.module.scss`
    //         )
    //     );

    //     if (fs.existsSync(targetFile)) {
    //         fs.unlinkSync(targetFile);
    //     }

    // }


    // adds dependencies and devDependencies to the package.json
    _addPackageDependencies() {

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

            let addonConfigPrefix = this.options.SpfxOptions.environment;
            try {
                addonConfig = JSON.parse(
                    fs.readFileSync(
                        this.templatePath(addonConfigPrefix + 'addonConfig.json')
                    )
                )
            } catch (err) {

                throw err;

            }

            let requestedLibraries = ['aurelia'];

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

                util.composeGulpFile(coreGulpTemplate, customGulpTemplate, targetGulpFile,
                    this.options);

            } catch (error) {

                this.log(error);

            }

        }
    }

}
