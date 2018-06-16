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

    }

    // Initialisation geenerator
    initializing() {

    }

    // Prompt for user input for Custom Generator
    prompting() {

        /* DON NOT ENTER CODE HERE */
        this.prompt(prompting.config)
            .then(answers => {
                console.log(answers);
                this.options.framework = 'none';

                switch (answers.framework) {
                    case "handlebars":
                    case "vuejs":
                    case "angularelements":
                        this.options.spfxFramework = 'none';
                        break;

                    case "reactjs":
                        this.options.spfxFramework = 'reactjs';
                    case "knockout":
                        this.options.spfxFramework = 'knockout';
                    case "noframework":
                        this.options.spfxFramework = 'none';
                        break;
                    default:
                        break;
                }

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

    _configGenerators(config) {

        console.log(config);

        this.composeWith(
            subGenerator.main, {}
        );

        this.composeWith(
            subGenerator.addons, {}
        )
        
        this.composeWith(
            subGenerator.spfx, {
                'framework': config.spfxFramework,
                'skip-install': true,
            }
        );

    }

    _showHelp() {
        console.log("Show Help");
        console.log(help.cmdOptions);
    }

}