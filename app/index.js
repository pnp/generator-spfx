"use strict"
// Base Yeoman generator
const Generator = require('yeoman-generator');
// Sub generators used by @pnp/spfx
const subGenerator = require('./subGenerators');
// Prompt core configuration
const prompting = require('./promptConfig');
// Import PnP Says
const pnpSays = require('../lib/pnpsays');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

        this.name = 'PnP Community SPFx Generator'

        this._setupOptions();
        this._generateSPFxOptions();

    }

    // Initialisation geenerator
    initializing() {

        this.pkg = require('../package.json');

        pnpSays(this);

    }

    // Prompt for user input for Custom Generator
    prompting() {

        /* DO NOT ENTER CODE HERE */
        this.prompt(prompting.config)
            .then(answers => {

                // Choose appro
                this.options.SpfxOptions['framework'] = this._evalSPFxGenerator(answers.framework);
                this.options.pnpFramework = answers.framework;

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
    writing() {

    }

    // adds additonal editor support in this case CSS Comb
    install() {

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {}

    // Custom evalutation of Addon options
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

    // Configure and launch all required generators
    _configGenerators(options) {

        // Launch Default SPFx generator
        this.composeWith(
            subGenerator.spfx,
            this.options.SpfxOptions
        );

        // If required launch library generator
        if (options.libraries.length !== undefined &&
            options.libraries.length !== 0) {

            this.composeWith(
                subGenerator.addons,
                options
            )

        }

        // Launch custom framework generators
        if (this.options.pnpFramework !== undefined &&
            subGenerator[this.options.pnpFramework] !== undefined) {

            this.composeWith(
                subGenerator[this.options.pnpFramework]
            )

        }

    }

    // Setup Base Options
    _setupOptions() {

        this.options.SpfxOptions = {
            'skip-install': false
        };

        this.option('component-description', {
            description: `Web part description`,
            type: String
        });

        this.option('component-name', {
            description: `Web part name`,
            type: String
        });

        this.option('component-type', {
            description: `The type of component:
                                        - "webpart"
                                        - "extension"`,
            type: String
        });

        this.option('enviroment', {
            description: `The target environment for the solution:
                                        - "onprem" or "spo".`
        });

        this.option('extension-type', {
            description: `The type of extension:
                                        - "ApplicationCustomizer", 
                                        - "FieldCustomizer"
                                        - "ListViewCommandSet"`,
            type: String
        });

        this.option('package-manager', {
            description: `Let you choose the package manager:
                                        - "npm"
                                        - "yarn"
                                        - "pnpm"`,
            type: String,
            alias: 'pm'
        });

        this.option('plusbeta', {
            description: "Use the beta packages",
            type: String
        });

        this.option('skip-feature-deployment', {
            description: `If specified, allow the tenant admin the choice of being able
                                      to deploy the components to all sites immediately without running any 
                                      feature deployment or adding apps in sites`,
            type: String
        });

        this.option('solution-name', {
            description: `Solution name, as well as folder name`,
            type: String
        });

    }

    // Generatore SPFx specifc parameters
    _generateSPFxOptions() {

        if (this.options['component-description'] !== undefined) {
            this.options.SpfxOptions['component-description'] = this.options['component-description'];
        }

        if (this.options['component-name'] !== undefined) {
            this.options.SpfxOptions['component-name'] = this.options['component-name'];
        }

        if (this.options['component-type'] !== undefined) {
            this.options.SpfxOptions['component-type'] = this.options['component-type'];
        }

        if (this.options['solution-name'] !== undefined) {
            this.options.SpfxOptions['solution-name'] = this.options['solution-name'];
        }

        if (this.options['plusbeta'] !== undefined) {
            this.options.SpfxOptions['plusbeta'] = this.options['plusbeta'];
        }

        if (this.options['environment'] !== undefined && this.options['environment'] === 'onprem') {
            this.options.SpfxOptions['environment'] = this.options['environment'];
        }

        if (this.options['extension-type'] !== undefined) {
            this.options.SpfxOptions['extension-type'] = this.options['extension-type'];
        }

        // alweays skip install
        this.options.SpfxOptions['skip-install'] = true;

        if (this.options['package-manager'] !== undefined) {
            this.options.SpfxOptions['package-manager'] = this.options['package-manager'];
        }

    }

}