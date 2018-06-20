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

        this.SpfxOptions = {
            'skip-install': true
        };

        this._generateSPFxOptions(this.options);

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
                this.SpfxOptions.framework = this._evalSPFxGenerator(answers.framework);

                this.options.jslib = this._evalAddons(
                    answers
                );

                this.options.framework = answers.framework;


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

        console.log('Selected Framework', options.framework);

        console.log('SPFX Options', this.SpfxOptions);

        this.composeWith(
            subGenerator[options.framework], {}
        );

        if (options.jslib.length !== undefined &&
            options.jslib.length !== 0) {

            this.composeWith(
                subGenerator.addons, {
                    'libraries': options.jslib
                }
            )

        } else {

            console.log('--- No addons');

        }

        // {
        //     'framework': options.spfxFramework,
        //     'skip-install': true,
        // }

        this.composeWith(
            subGenerator.spfx,
            this.SpfxOptions
        );

    }

    // this.options.hasKey('component-type') ? this.options.spfxOptions['content-type'] = this.options['content-type'] : ;
    // this.spfxArgs
    // '--component-type webpart',
    // '--component-description HelloWorld',
    // '--component-name helloworld',
    // '--solution-name HelloWorld',
    // '--environment spo'

    _generateSPFxOptions(options) {

        // console.log('OOOPPPTIONS', options);
        // console.log('OOOPPPTIONS', options['component-type'])

        if (options['component-type'] !== undefined) {
            this.SpfxOptions['component-type'] = options['component-type'];
        }

        if (options['component-type']) {
            this.SpfxOptions['component-type'] = options['component-type'];
        }

        if (options['component-description']) {
            this.SpfxOptions['component-description'] = options['component-description'];
        }

        if (options['component-name']) {
            this.SpfxOptions['component-name'] = options['component-name'];
        }

        if (options['solution-name']) {
            this.SpfxOptions['solution-name'] = options['solution-name'];
        }

        if (options['environment']) {
            this.SpfxOptions['environment'] = options['environment'];
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