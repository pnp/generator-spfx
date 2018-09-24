// Base Yeoman generator
const Generator = require('yeoman-generator');
// import nodejs fs
const fs = require('fs');
// path
const path = require('path');
// import nodejs fs
const util = require('../../lib/util');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);
        // configuration of user prompt

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

        // deploy vue-shims
        this._copyShims();
        // add external to the configuration
        this._addExternals();
        // add all package depenedencies configured in addonConfig.json.
        this._addPackageDependencies();
        // inject custom tasks to gulpfile
        this._injectToGulpFile();
        // remove default scss
        this._removeWebPartScss();
        // Update/add templates
        util.deployTemplates(this);
        // finally run install
        util.runInstall(this);
        

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {
        // Currently not supported don't use this
    }

    _removeWebPartScss() {
        // this file is created by OOTB SPFx generator.
        // we don't need it in Vue web part.
        const manifest = util.getComponentManifest(this);
        let targetFile = this.destinationPath(
            path.join(manifest.componentPath, `${manifest.componentClassName}.module.scss`)
        );

        if (fs.existsSync(targetFile)) {
            fs.unlinkSync(targetFile);
        }
    }

    _addExternals() {

        // reading JSON
        let config = JSON.parse(
            fs.readFileSync(this.destinationPath('config/config.json'))
        );

        if (config.externals !== undefined) {
            // Add Vuejs entry
            config.externals.vue = "./node_modules/vue/dist/vue.min.js";

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
        this._utilAddPackageDependencies(this, ['vuejs']);
    }

    _copyShims() {
        if (this.fs.exists(this.destinationPath('src/vue-shims.d.ts'))) {
            return;
        }

        this.fs.copy(this.templatePath('src/vue-shims.d.ts'),
            this.destinationPath('src/vue-shims.d.ts'));
    }

    _injectToGulpFile() {
        this._utilInjectToGulpFile(this);
    }

    // adds dependencies and devDependencies to the package.json
    _utilAddPackageDependencies(yeoman, requestedLibraries) {
        if (fs.existsSync(yeoman.destinationPath('package.json'))) {

            // request the default package file
            let config;

            try {
                config = JSON.parse(fs.readFileSync(
                    yeoman.destinationPath('package.json')
                ));

            } catch (error) {

                throw error;

            }

            // request current addon configuration
            let addonConfig;

            try {
                addonConfig = JSON.parse(
                    fs.readFileSync(
                        yeoman.templatePath('addonConfig.json')
                    )
                )
            } catch (err) {

                throw err;

            }

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
                    yeoman.destinationPath('package.json'),
                    JSON.stringify(newPkgConfig, null, 2)
                );

            } else {

                throw 'Updated package.json file is invalid.';

            }

        }
    }

    _utilInjectToGulpFile(yeoman) {
        let targetGulpFile = yeoman.destinationPath('gulpfile.js');

        if (fs.existsSync(targetGulpFile)) {

            let coreGulpTemplate = yeoman.templatePath('../../../app/templates/gulpfile.js');
            let customGulpTemplate = yeoman.templatePath('./gulpfile.js');


            try {

                util.composeGulpFile(coreGulpTemplate, customGulpTemplate, targetGulpFile);

            } catch (error) {

                yeoman.log(error);

            }

        }
    }

}