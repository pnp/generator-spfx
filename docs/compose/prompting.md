# How to implement prompting

Yeoman generator uses a library named [inquirejs](https://github.com/SBoudrias/Inquirer.js/) for the prompt configuration. To read more on the general prompting behaviour checkout [interacting with user](http://yeoman.io/authoring/user-interactions.html) in the yeomman documentation.

To support multiple Yeoman generators with different prompting configurations a special method was implemented in the core generators such as the addon generator.

```bash
generators/addons
├── index.js
├── promptConfig.js    # <- this the configuration file for the prompts
└── templates
    └── addonConfig.json
```

All prompts required by the generator are included in the prompt config file directly inside the Yeoman generator.

```js
const chalk = require('chalk');

const jqueryOptions = [{
        'name': '3.x.x (recommended)',
        'value': 3
    },
    {
        'name': '2.x.x',
        'value': 2
    }
]

const configOptions = [
    // Library selection
    {
        type: 'checkbox',
        message: 'Which libraries to include',
        name: 'jsLibrary',
        choices: [{
            name: 'jQuery',
            value: 'jquery'
        }, {
            name: 'pnpjs',
            value: '@pnp/pnpjs'
        }]
    },
    // jQuery version selection
    {
        type: 'list',
        message: `${chalk.bold.yellow('jQuery: ')} Please choose a version:`,
        name: 'jQueryVersion',
        choices: jqueryOptions,
        when: answers => answers.jsLibrary.indexOf('jquery') !== -1
    }
]

module.exports = configOptions;
```

This example defineds the questionary for jQuery and PnP and will be exported as a module in node. This is required because all configuration options will be then collected together in the main generator and is located at the ```/app``` folder.

Inside this folder is another promptConfig located and the particular configuration of the addon generator prompting gets imported.

```js
// Add configuration of Addon generator
const addon = require('../generators/addons/promptConfig');
configOptions = configOptions.concat(addon);

const promptConfig = {
    config: configOptions
}

module.exports = promptConfig;
```

This code imports the module of the addon configuraton and adds the settings to the default generator prompting. This config file will again be exported as a module and gets used in the main generator code.

```js
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
```

So this makes sure that all prompt configurations can be managed centralised even the ones specific to additional generators.

!!! info
    In case you custom generator has a special promting configuration please add a remark in your PR

