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

        // deploy additional files to the project directory
        this._deployFiles();
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

    _deployFiles() {

        this.fs.copy(
            this.templatePath('config/copy-static-assets.json'),
            this.destinationPath('config/copy-static-assets.json')
        )

    }

    _removeWebPartScss() {

        // this file is created by OOTB SPFx generator.
        // we don't need it in Vue web part.

        const manifest = util.getComponentManifest(this);

        if (manifest === null) {
            return;
        }

        let targetFile = this.destinationPath(
            path.join(
                manifest.componentPath,
                `${manifest.componentClassName}.module.scss`
            )
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
            config.externals.vue = './node_modules/vue/dist/vue.min.js';

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

    _copyShims() {

        // deploy vue shims
        if (!fs.existsSync(this.destinationPath('types/vue/shims-vue.d.ts'))) {

            this.fs.copy(
                this.templatePath('types/vue/shims-vue.d.ts'),
                this.destinationPath('types/vue/shims-vue.d.ts')
            );

        }

        // deploy tsx shims
        if (!fs.existsSync(this.destinationPath('types/vue/shims-tsx.d.ts'))) {

            this.fs.copy(
                this.templatePath('types/vue/shims-tsx.d.ts'),
                this.destinationPath('types/vue/shims-tsx.d.ts')
            );

        }

        // Update TS Config for Shims
        if (fs.existsSync(this.destinationPath('tsconfig.json'))) {

            let tsconfig = fs.readFileSync('tsconfig.json', 'utf-8');

            try {

                let tsconfigJson = JSON.parse(tsconfig);

                // Add additinal typing root
                if (tsconfigJson !== undefined &&
                    tsconfigJson.compilerOptions !== undefined &&
                    tsconfigJson.compilerOptions.typeRoots !== undefined &&
                    tsconfigJson.compilerOptions.typeRoots.indexOf('./types') === -1) {

                    tsconfigJson.compilerOptions.typeRoots.push('./types');

                }

                // Add additional typing include
                if (tsconfigJson !== undefined &&
                    tsconfigJson.include !== undefined &&
                    tsconfigJson.include.indexOf('types/**/*.d.ts') === -1) {

                    tsconfigJson.include.push('types/**/*.d.ts');

                }

                // Udpate TS Config
                fs.writeFileSync(
                    this.destinationPath('tsconfig.json'),
                    JSON.stringify(tsconfigJson, null, 2)
                )

            } catch (error) {

                this.log('There was an update writing the tsconfig.json: ', error);

            }

        }

    }

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

            try {
                addonConfig = JSON.parse(
                    fs.readFileSync(
                        this.templatePath('addonConfig.json')
                    )
                )
            } catch (err) {

                throw err;

            }

            let requestedLibraries = ['vuejs'];

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
