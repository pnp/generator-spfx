# Inject dependencies using your custom generator

It is possible to inject dependencies into the generated project using your custom generator. The sub generator for Handlebars, for example, does this. A config file for all required npm packages to include can be found in this generator:

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

The [addonConfig.json](https://github.com/pnp/generator-spfx/tree/master/generators/handlebars/templates) in the handlebar generator contains all required dependencies. Those npm packages that are required during runtime and those required during development.

To inject those dependecies to the generated `package.json`, call the following method in your generator code.

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

            // select the requested libraries
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

For the requested libraries parameter, pass in an array of identifiers stored in your addon configuration. In the case of the handlebar generator this is just 'handlebars':

```js 
let requestedLibraries = ['handlebars'];
```

You can have multiple identifiers in this array.

## Remark

It is possible to inject additional dependencies by calling npm install from the generator directly. In case of multiple runs there may be delays and conflicts for the injection and is even slower than adding it directly in the `package.json` files.

!!! tip "How to include version numbers?"
    Make sure you don't have a fixed number included in your package versions.
    Make sure you include '^' in front of the version number. This makes sure that the latest version in that version branch will be used.
    More on [caret ranges](https://docs.npmjs.com/misc/semver#caret-ranges-123-025-004) can be found it the official npm documentation.
