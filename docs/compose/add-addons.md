# Step-by-Step Guide for custom addons

| Applies to: | 
|:-- | 
| [generators/addons](https://github.com/pnp/generator-spfx/tree/master/generators/addons) |


In case to integrate custom client side development dependencies there is no requirement to write an own generator this can be included directly in the addon generator.

## Add npm dependencies

The dependency configuration of additional addons is located in [generators/addons/templates](https://github.com/pnp/generator-spfx/tree/master/generators/addons/templates) and is named addonConfig.json.

In this JSON file you can include additional configuration for various NPM packages. This also the 

```json
{
    "jquery@2": {
        "dependencies": {
            "jquery": "^2.2.4",
            "@types/jquery": "^2.0.49"
        }
    },
    "jquery@3": {
        "dependencies": {
            "jquery": "^3.0.0",
            "@types/jquery": "^3.0.0"
        }
    },
    "pnpjs": {
        "dependencies": {
            "@pnp/pnpjs": "^1.1.1"
        }
    }
}
```

To add a custom library add a new property in the form of:

```js
"yourcustomlibrary@2": {  // <custom library name>@<major version label>
    "dependencies": {     // "dependencies" or "devDependencies"
        "firstdependency": "^1.0.0",        // library named first dependecy,
        "@types/firstdependency": "^1.0.0", // types for first dependecy
        // .. any additional library
    }
}
```

The updated `addonConfiguration.json` file then might look like this:

```json hl_lines="19 20 21 22 23 24"
{
    "jquery@2": {
        "dependencies": {
            "jquery": "^2.2.4",
            "@types/jquery": "^2.0.49"
        }
    },
    "jquery@3": {
        "dependencies": {
            "jquery": "^3.0.0",
            "@types/jquery": "^3.0.0"
        }
    },
    "pnpjs": {
        "dependencies": {
            "@pnp/pnpjs": "^1.1.1"
        }
    },
    "yourcustomlibrary@2": {
        "dependencies": {
            "firstdependency": "^1.0.0",
            "@types/firstdependency": "^1.0.0"
        }
    }
}
```


!!! warning "DO NOT use comments in JSON files - The files become invalid"

## Integrate new library in prompting

To ask the user to include this new library open the ```promptConfig.js``` file in the addon generator. In the config optiosn add a reference to the new library.


```js hl_lines="16 17 18 19 20"

...

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
        },
        // New reference
        {
            name: 'New awesome library to include',
            value: 'yourcustomlibrary@2'
        }
        ]
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

The name of the new reference can set to any descriptive test and the value must match the property name used in the ```addonConfig.json```.

The selection of this dialog gets picked up automatically during the provisioning process and will be added to the ```package.json``` option.

## Inject dependencies in custom generator

It is possible to use the same mechanism in custom generators too. The sub generator for Handlebars for example make use of the same mechanism. A config file for all required npm packages to include can be found in this generator too.

```js
{
    "handlebars": {
        "dependencies": {
            "handlebars": "^4.0.6"
        },
        "devDependencies": {
            "handlebars-template-loader": "^1.0.0",
            "@types/handlebars": "^4.0.39"
        }
    }
}
```

This [addonConfig.json](https://github.com/pnp/generator-spfx/tree/master/generators/handlebars/templates) in the handlebar generator contains all required dependencies. Those npm packages that are required during runtime and those required during development.

To inject those dependecies to the ```package.json``` call the following method in your generator code.

```js
    _addPackageDependencies() {

        if (fs.existsSync(this.destinationPath('package.json'))) {

            // request the default package file
            let config;

            try {
                config = JSON.parse(fs.readFileSync(
                    this.destinationPath('package.json')
                ));

            } catch (error) {

                throw error;

            }

            // request current addon configuration
            let addonConfig;

            try {
                addonConfig = JSON.parse(
                    fs.readFileSync(
                        this.templatePath('addonConfig.json')
                    )
                )
            } catch (err) {

                throw err;

            }

            // select the requested libraried
            let requestedLibraries = ['handlebars'];

            // declare new package config file
            let newPkgConfig;

            try {

                newPkgConfig = util.mergeAddons(
                                        addonConfig, 
                                        requestedLibraries, 
                                        config);

            } catch (error) {

                throw error

            }

            // if content could be added to the new package.json write it
            if (newPkgConfig !== undefined && newPkgConfig !== null) {

                fs.writeFileSync(
                    this.destinationPath('package.json'),
                    JSON.stringify(newPkgConfig, null, 2)
                );

            } else {

                throw 'Updated package.json file is invalid.';

            }

        }

    }
```

On the requested library pass in an array of identifier stored in your addon configuration. In case of the handlebar generator this is just 'handlebars'.

```js 
let requestedLibraries = ['handlebars'];
```

You can have multiple identifiers in this array.

## Remark

It is possible to inject additional dependencies by calling npm install from the generator directly. In case of multiple runs there maybe delayes and conflicts for the injection and is even a slower than adding it directly in the `package.json` files.