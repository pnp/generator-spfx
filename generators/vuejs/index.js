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

    // adds additonal editor support in this case CSS Comb
    configuring() {
        // Currently not supported don't use this
    }

    // adds additonal editor support in this case CSS Comb
    writing() {
        // Currently not supported don't use this
    }

    // adds additonal editor support in this case CSS Comb
    install() {

        this._copyShims();
        this._addPackageDependencies();
        this._injectToGulpFile();
        util.runInstall(this);
        util.writeTemplates(this);

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {
        // Currently not supported don't use this
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