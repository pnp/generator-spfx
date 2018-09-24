# Composing custom SPFx generators

# PnP SPFx Generator - Development

Before you start development of a custom yeoman generator, please be sure to read [Writing your own Yeoman Generator](http://yeoman.io/authoring/).

The following sections explain the overall setup and considerations.

## Project Setup
The following directory listing gives you an overview of the main directories in the generator:

```txt
├── app                <-- Main Generator
├── docs               <-- Documentation
├── generators         <-- Custom Generators
│   ├── addons         <-- Addon Generator reserved for client libraries only
│   ├── handlebars     <-- PnP Handlebars generator
├── lib                <-- General purpose libraries
├── test               <-- Mocha Unit Tests
├── tools
│   ├── generator-template  <-- Template yeoman generator
```

## Getting started writing a new generator

To get started implementing and adding a new generator, copy the template folder in the generators folder and rename it to a meaningful name matching your framework.

In the folder you will find the following files:

* **index.js** - main sub generator file
* **promptconfig.js** - special prompt config related to sub generator
* **template/addonConfig.json** - This file contains all NPM Packages that need to be installed

### User prompt for sub generator

If your generator needs some additional information from the user, questions can be configured in the file `promptconfig.js`. The content of this file follows the default Yeoman generator user prompting described in the article [Interacting with the User](http://yeoman.io/authoring/user-interactions.html).

The library Yeoman uses is [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/).

```js
"use strict"

// These are just sample selection of options
const options = [{
        name: 'Option A',
        value: 'option-a'
    },
    {
        name: 'Option B',
        value: 'option-b'
    }
];

const configOptions = [
    // Sample content of questions
    {
        type: 'list',
        message: 'Please add your options in here',
        name: 'youroptions',
        choices: options
    }
    // , addon
]

const promptConfig = {
    config: configOptions
}

module.exports = promptConfig;
```

This example exports the configuration as a module and can be integrated in the main Yeoman generator to consolidate the user prompts in the main generator.

### Generator implementation - index.js

All actions required for a new custom generator need to be implemented in the `index.js` file.

The default template currently lists all possible methods in the correct call order provided by the default Yeoman generator:

```js
// Base Yeoman generator
const Generator = require('yeoman-generator');
// prompt configuration
const prompts = require('./promptConfig');

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
        // Currently not supported - Don't use this
    }

    // adds additonal editor support in this case CSS Comb
    writing() {
        // Currently not supported - Don't use this
    }

    // adds additonal editor support in this case CSS Comb
    install() {

        /**
         * Place your custom deployment code in here
         */

    }

    // Run installer normally time to say goodbye
    // If yarn is installed yarn will be used
    end() {
    }

}
```

The call order of a Yeoman generator is defined in the following steps:

1. constructor()
2. initializing()
3. prompting()
4. configuring()
5. writing()
6. install()
7. end()

Because of the dependency on the Microsoft Yeoman Generator, the actions need to be delayed to the next step. After the SPFx generator has written the files to the file system through its `writing()` method, the custom generator is able to update the configuration with additional information.

Instead of adding the code of the custom generator to the `writing()` method, the code has to be added to the `install()` method.

In the case of the Handlebars generator, the following functions get called in the `install()` method:

```js

install() {
    // deploy additional files to the project directory
    this._deployFiles();

    // add externals to the configuration
    this._addExternals();
    
    // add all package depenedencies configured in addonConfig.json.
    this._addPackageDependencies();
    
    // inject custom tasks to gulpfile
    this._injectToGulpFile();
    
    // finally run install
    util.runInstall(this);

}
```

This is required because all additional tasks have to be performed on top of the assets deployed by the SPFx default assets.

Further reading:

* [How to implement prompting](./prompting.md)
