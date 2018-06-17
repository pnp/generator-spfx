// Base Yeoman generator
const Generator = require('yeoman-generator');
// Sub generators used by @pnp/spfx
const subGenerator = require('./subGenerators');

// Prompt core configuration
const prompting = require('./promptConfig');

// Help Message
const help = require('./help');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

        this.name = "Communit SPFx Generator"

    }

    // Initialisation geenerator
    initializing() {

        this.pkg = require('../package.json');

    }

    // Prompt for user input for Custom Generator
    prompting() {

        /* DON NOT ENTER CODE HERE */
        this.prompt(prompting.config)
            .then(answers => {

                console.log(answers);

                // Choose appro
                this.options.spfxFramework = this._evalSPFxGenerator(answers.framework);

                this.options.jslib = this._evalAddons(
                    answers
                );


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
                    if(selections.jQueryVersion !== undefined){
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

        this.composeWith(
            subGenerator.main, {}
        );

        console.log('Config Generators', options);

        if (options.jslib.length !== undefined &&
            options.jslib.length !== 0) {

            this.composeWith(
                subGenerator.addons, {}
            )

        } else {
            console.log('--- No addons');
        }

        console.log('SPFX Framework:    ' + options.spfxFramework)

        this.composeWith(
            subGenerator.spfx, {
                'framework': options.spfxFramework,
                'skip-install': true,
            }
        );

    }

    _showHelp() {
        console.log("Show Help");
        console.log(help.cmdOptions);
    }

}