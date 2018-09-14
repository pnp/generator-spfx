// Base Yeoman generator
const Generator = require('yeoman-generator');
// import nodejs fs
const fs = require('fs');
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
        util.addPackageDependencies(this, ['vuejs']);
    }

    _copyShims() {
        if (this.fs.exists(this.destinationPath('src/vue-shims.d.ts'))) {
            return;
        }

        this.fs.copy(this.templatePath('src/vue-shims.d.ts'),
            this.destinationPath('src/vue-shims.d.ts'));
    }

    _injectToGulpFile() {
        util.injectToGulpFile(this);
    }

}