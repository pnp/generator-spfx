"use strict"
// Base Yeoman generator
const Generator = require('yeoman-generator');
// Sub generators used by @pnp/spfx
const subGenerator = require('./subGenerators');
// Prompt core configuration
const prompting = require('./promptConfig');
// Import PnP Says
const pnpSays = require('../lib/pnpsays');
// Import utilities
const util = require('../lib/util');
// Telemetry import
const telemetry = require('../lib/telemetry');

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
        this.options.goodToGo = pnpSays(this);

    }

    // Prompt for user input for Custom Generator
    prompting() {

        if (!this.options.goodToGo) {
            process.exit(1);
        }

        // Update to config.existed based on .yo-rc file
        this.config.existed = util.configExists();

        /* Generator Main Logic */
        // if config existed fallback to default generator
        if (this.config.existed) {

            // add proper opptions in here
            this.options.SpfxOptions['framework'] = this.config.get('framework');
            this.options.SpfxOptions['pnp-framework'] = this.config.get('framework');
            this.options.SpfxOptions['pnp-libraries'] = this.config.get('pnp-libraries');
            this.options.SpfxOptions['pnp-vetting'] = this.config.get('pnp-vetting');
            this.options.SpfxOptions['pnp-ci'] = this.config.get('pnp-ci');

            this.options.pnpFramework = this.config.get('pnpFramework') !== 'angularelements' ? this.config.get('pnpFramework') : "none";

            // writes previous framework and pnpFramework names to telemetry
            if (this.options['testRun'] === undefined) {
                telemetry.trackEvent('Component', this.options.SpfxOptions);
            }

            this._configGenerators(this.options);

        } else {

            this.prompt(
                    prompting.config(this.options.environment)
                )
                .then(answers => {

                    // Choose appro
                    this.options.SpfxOptions['framework'] = this._evalSPFxGenerator(answers.framework);
                    this.options.SpfxOptions['pnp-framework'] = answers.framework;
                    this.options.SpfxOptions['environment'] = answers.spfxenv;

                    this.options.environment = this.options.environment || answers.spfxenv;
                    this.options.pnpFramework = answers.framework;
                    this.options.vetting = answers.vetting;
                    this.options.ci = answers.continuousIntegration;
                    this.options.testFramework = answers.testframework; // this is needed for CI and unit testing integration

                    // check if test lint was selected in any of the generators
                    this.options.tsLint = answers.tsLint ? answers.tsLint : false;

                    // generate addon configuration
                    this.options.libraries = this._evalAddons(
                        answers
                    );

                    // Check if TypeScript
                    if (answers.typescript !== undefined) {

                        this.options.libraries = this.options.libraries.concat(answers.typescript)

                    }

                    // Addon Library
                    this.options.SpfxOptions['pnp-libraries'] = this.options.libraries;

                    // Addon Vetting options
                    this.options.SpfxOptions['pnp-vetting'] = this.options.vetting;

                    // Addon continouse integration
                    this.options.SpfxOptions['pnp-ci'] = this.options.ci;

                    // Addon testing integration
                    this.options.SpfxOptions['pnp-testing'] = this.options.testFramework;

                    if (answers.framework === "angularelements") {

                        // set choosen spfx frameworke
                        this.options.SPFxFramework = answers.framework;

                        if (answers.solutionName) {
                            this.options.solutionName = answers.solutionName;
                            this.options.SpfxOptions.solutionName = `${answers.solutionName}-spfx`;
                        }

                        this.options.angularCliOptions = answers.angularCliOptions;

                    }

                    // save configuration of first selection
                    this.config.set('framework', this.options.SpfxOptions['framework']);
                    this.config.set('pnpFramework', this.options.pnpFramework);
                    this.config.set('pnp-libraries', this.options.libraries);
                    this.config.set('pnp-ci', this.options.ci);
                    this.config.set('pnp-vetting', this.options.vetting);
                    this.config.set('spfxenv', this.options.SpfxOptions['environment']);
                    this.config.set('pnp-testing', this.options.SpfxOptions['pnp-testing']);
                    this.config.save();

                    if (this.options['testRun'] === undefined) {
                        // track yeoman configuration options
                        telemetry.trackEvent('Scaffold', this.options.SpfxOptions);

                    }

                    this._configGenerators(this.options);

                });

        }
    }

    // adds additonal editor support in this case CSS Comb
    configuring() {

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

        if (selections.jsLibrary === undefined) {
            return [];
        }

        return selections.jsLibrary.map(item => {

            switch (item) {
                case "ouifr":
                    if (selections.ouifrVersion !== undefined) {
                        item = `${item}@${selections.ouifrVersion}`
                    }
                    break;
                default:
                    break;
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
            case "aurelia":
                generatorFramework = 'none';
                break;

            case "reactjs":
            case "react":
                generatorFramework = 'react';
                break;

            case "reactjs.plus":
                generatorFramework = 'react';
                break;

            case "knockout":
                generatorFramework = 'knockout';
                break;

            case "knockout.plus":
                generatorFramework = 'knockout';
                break;

            case "noframework":
                generatorFramework = 'none';
                break;

            case "none.plus":
                generatorFramework = 'none';
                break;

            default:
                break;

        }

        return generatorFramework;

    }

    // Configure and launch all required generators
    _configGenerators(options) {

        // Launch Addon Configurator SPFx generator
        if (this.config.existed === false) {

            this.composeWith(
                subGenerator.addons,
                options
            )

        }

        // Do not 'skip-install' for original SPFx generator
        if ((this.options.SpfxOptions.framework === "react" &&
                this.options.pnpFramework !== "reactjs.plus") ||
            (this.options.SpfxOptions.framework === "knockout" &&
                this.options.pnpFramework !== "knockout.plus") ||
            (this.options.SpfxOptions.framework === "none" &&
                this.options.pnpFramework !== "none.plus")) {

            this.options.SpfxOptions['skip-install'] = false;

        }

        // Launch defaul generator
        this.composeWith(
            subGenerator.spfx,
            this.options.SpfxOptions
        );

        // Launch custom framework generators
        if (this.options.pnpFramework !== undefined &&
            subGenerator[this.options.pnpFramework] !== undefined) {

            this.composeWith(
                subGenerator[this.options.pnpFramework],
                this.options
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

        this.option('environment', {
            description: `The target environment for the solution:
                                        - "onprem"
                                        - "onprem19"
                                        - "spo".`,
            type: String
        });

        this.option('extension-type', {
            description: `The type of extension:
                                        - "ApplicationCustomizer",
                                        - "FieldCustomizer"
                                        - "ListViewCommandSet"`,
            type: String
        });

        this.option('is-domain-isolated', {
            description: `If 'y', web part will be rendered in isolated domain using IFrame. If set to "y", sets the component type as web part.`,
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

        this.option('skip-version-check', {
            description: `Skip version check of current version`,
            type: String
        });

        this.option('continuousIntegration', {
            description: `Adds a pipeline definition for the desired continuous integration solution`,
            type: String,
            alias: 'ci'
        });

    }

    // Generator SPFx specifc parameters
    _generateSPFxOptions() {

        if (this.options['component-description'] !== undefined) {
            this.options.SpfxOptions['componentDescription'] = this.options['component-description'];
            // for testing only
            this.options.SpfxOptions['component-description'] = this.options['component-description'];
        }

        if (this.options['component-name'] !== undefined) {
            this.options.SpfxOptions['componentName'] = this.options['component-name'];
            // for testing only
            this.options.SpfxOptions['component-name'] = this.options['component-name'];
        }

        if (this.options['component-type'] !== undefined) {
            this.options.SpfxOptions['componentType'] = this.options['component-type'];
            // for testing only
            this.options.SpfxOptions['component-type'] = this.options['component-type'];
        }

        if (this.options['solution-name'] !== undefined) {
            this.options.SpfxOptions['solutionName'] = this.options['solution-name'];
            // for testing only
            this.options.SpfxOptions['solution-name'] = this.options['solution-name'];
        }

        if (this.options['plusbeta'] !== undefined) {
            this.options.SpfxOptions['plusbeta'] = this.options['plusbeta'];
        }

        if (this.options['environment'] !== undefined) {
            this.options.SpfxOptions['environment'] = this.options['environment'];
        }

        if (this.options['extension-type'] !== undefined) {
            this.options.SpfxOptions['extensionType'] = this.options['extension-type'];
        }

        if (this.options['is-domain-isolated'] !== undefined) {
            this.options.SpfxOptions['is-domain-isolated'] = this.options['is-domain-isolated'];
        }

        // always skip install
        this.options.SpfxOptions['skip-install'] = true;

        if (this.options['p'] === true && this.options['m'] !== undefined) {
            this.options.SpfxOptions['package-manager'] = this.options['m'];
            this.options['package-manager'] = this.options['m'];
        }

        if (this.options['package-manager'] !== undefined) {
            this.options.SpfxOptions['package-manager'] = this.options['package-manager'];
        }

        if (this.options['test-run'] !== undefined || this.options['skip-telemetry'] !== undefined) {
            this.options.SpfxOptions['testrun'] = true;
        } else {
            this.options.SpfxOptions['testrun'] = false;
        }

        if (this.options['skip-version-check'] === undefined) {
            this.options.SpfxOptions['skipversioncheck'] = false
        } else {
            this.options.SpfxOptions['skipversioncheck'] = true
        }

    }

}
