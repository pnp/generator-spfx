# Add custom Addon dependencies

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

The same method change be used to [inject dependencies on custom generators](./custgen-dependencies) too.