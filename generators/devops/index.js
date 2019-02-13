'use strict';

// Base Yeoman generator
const Generator = require('yeoman-generator');

// filesystem
const fs = require('fs');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

    }

    // Initialisation generator
    initializing() {

    }

    prompting() {}

    configuring() {}

    writing() {
    }

    install() {
        if (this.options.continuousIntegration === 'azure') {
            const azurePipelines = this.fs.read(
                this.templatePath('azure-pipelines.yml'),
                'utf-8');

            fs.writeFileSync(
                this.destinationPath('azure-pipelines.yml'),
                azurePipelines
            )
        }

    }

    end() {

    }

}
