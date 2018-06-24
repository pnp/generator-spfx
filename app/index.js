"use strict"
// Base Yeoman generator
const Generator = require('yeoman-generator');
// Sub generators used by @pnp/spfx
const subGenerator = require('./subGenerators');
// Prompt core configuration
const prompting = require('./promptConfig');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

        this.name = "Community SPFx Generator"

        this.options.SpfxOptions = {
            'skip-install': true
        };

        // console.log('all Options', this.options);

        this._generateSPFxOptions();

    }

    // Initialisation geenerator
    initializing() {

        this.pkg = require('../package.json');

    }

    // Prompt for user input for Custom Generator
    prompting() {

        /* DO NOT ENTER CODE HERE */
        this.prompt(prompting.config)
            .then(answers => {

                // Choose appro
                this.options.SpfxOptions['framework'] = this._evalSPFxGenerator(answers.framework);

                this.options.libraries = this._evalAddons(
                    answers
                );

                this.options.SPFxFramework = answers.framework;


                this._configGenerators(this.options);

            });

    }

    // adds additonal editor support in this case CSS Comb
    configuring() {
        // console.log('APP --- Config');

    }

    // adds additonal editor support in this case CSS Comb
    writing() {}

    // adds additonal editor support in this case CSS Comb
    install() {

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {

    }

    _evalAddons(selections) {

        return selections.jsLibrary.map(item => {

            switch (item) {
                case "jquery":
                    if (selections.jQueryVersion !== undefined) {
                        item = `${item}@${selections.jQueryVersion}`
                    }

                    break;

                default:
                    break
            }

            return item;

        });

    }

    // detects framework for custom generator
    _evalSPFxGenerator(selectedFramework) {

        let generatorFramework;

        switch (selectedFramework) {
            case "handlebars":
            case "vuejs":
            case "angularelements":
                generatorFramework = 'none';
                break;

            case "reactjs":
            case "react":
                generatorFramework = 'react';
                break;
            case "knockout":
                generatorFramework = 'knockout';
                break;
            case "noframework":
                generatorFramework = 'none';
                break;
            default:
                break;
        }

        return generatorFramework;

    }

    _configGenerators(options) {

        

        if (options.libraries.length !== undefined &&
            options.libraries.length !== 0) {

            this.composeWith(
                subGenerator.addons,
                options
            )

        } else {

            console.log('--- No addons');

        }

        this.composeWith(
            subGenerator.spfx,
            options.SpfxOptions
        );

        // {
        //     'framework': options.spfxFramework,
        //     'skip-install': true,
        // }

        // console.log(this.SpfxOptions);


    }

    _generateSPFxOptions() {

        if (this.options['component-type'] !== undefined) {
            this.options.SpfxOptions['component-type'] = this.options['component-type'];
        }

        if (this.options['component-type'] !== undefined) {
            this.options.SpfxOptions['component-type'] = this.options['component-type'];
        }

        if (this.options['component-description'] !== undefined) {
            this.options.SpfxOptions['component-description'] = this.options['component-description'];
        }

        if (this.options['component-name'] !== undefined) {
            this.options.SpfxOptions['component-name'] = this.options['component-name'];
        }

        if (this.options['solution-name'] !== undefined) {
            this.options.SpfxOptions['solution-name'] = this.options['solution-name'];
        }

        if (this.options['environment'] !== undefined) {
            this.options.SpfxOptions['environment'] = this.options['environment'];
        }

    }


    _showHelp() {
        console.log("Show Help");
        console.log(help.cmdOptions);
    }

    _convertArgsToOptions(defaultOptions, args) {
        console.log(defaultOptions);

        for (let i = 0; i < args.length; i++) {
            let currentArg = args[i].replace('--', '').split(' ');
            console.log(currentArg);
        }
    }

}