// incldue nodejs fs
const fs = require('fs');
// load ejx rendering engine
const ejs = require('ejs');
// check if command-exists
const commandExists = require('command-exists').sync;
// nodeJS file properties
const {
    spawn
} = require('child_process');

const removeJsonComments = (jsonContent) => {

    if (jsonContent !== undefined &&
        jsonContent !== null) {

        var commentEval = new RegExp(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm);

        return jsonContent.replace(commentEval, '');

    } else {

        return null;

    }

}


// Helper function to sore properties in package.json primarly
const sortProps = (dependencies) => {

    var sortedObject = {};
    let sortedKeys = Object.keys(dependencies).sort();

    for (var i = 0; i < sortedKeys.length; i++) {
        sortedObject[sortedKeys[i]] = dependencies[sortedKeys[i]]
    }

    return sortedObject;

}

module.exports = {

    // merges addons in package.json
    mergeAddons: (addonConfig, requestedLibraries, config) => {

        let dependencies = config.dependencies;
        let devDependencies = config.devDependencies;

        for (let key in addonConfig) {

            if (requestedLibraries.indexOf(key) !== -1) {

                // inject dependencies
                if (addonConfig[key].dependencies) {

                    for (let depend in addonConfig[key].dependencies) {

                        dependencies[depend] = addonConfig[key].dependencies[depend];

                    }

                }

                // inject dev dependencies
                if (addonConfig[key].devDependencies) {

                    for (let depend in addonConfig[key].devDependencies) {

                        devDependencies[depend] = addonConfig[key].devDependencies[depend];

                    }
                }
                // adding dev dependencies
            }

        }

        // sort package properties
        let sortedDependencies = sortProps(dependencies);
        let sortedDevDependencies = sortProps(devDependencies);

        // assing sorted dependencies
        config.dependencies = sortedDependencies;
        config.devDependencies = sortedDevDependencies;

        // return new configuration
        return config;

    },
    // generate a new gulp file with custom tasks registered
    composeGulpFile: (coreTemplate, customTemplate, outPutfile) => {

        if (!fs.existsSync(coreTemplate)) {
            const error = 'Error: File names ' + coreTemplate + ' cannot be found';
            throw error;
        }

        if (!fs.existsSync(customTemplate)) {
            const error = 'Error: File names ' + customTemplate + ' cannot be found';
            throw error;
        }

        let coreTemplatContent = fs.readFileSync(coreTemplate, 'utf-8'),
            customTemplateContent = fs.readFileSync(customTemplate, 'utf-8');

        let gulpGileContent = ejs.render(coreTemplatContent, {
            customTasks: customTemplateContent
        });

        try {

            fs.writeFileSync(outPutfile, gulpGileContent, 'utf-8');

        } catch (error) {

            throw error;

        }

    },
    // helper method to run installation of npm packages
    runInstall: (yeoman) => {

        const packageManager = yeoman.options['package-manager'];

        if (packageManager === undefined ||
            packageManager.toLowerCase() === "npm" ||
            packageManager.toLowerCase() === "yarn") {

            const hasYarn = commandExists('yarn');

            // override yarn if npm is preferred
            if (packageManager === 'npm') {
                hasYarn = false;
            }

            yeoman.installDependencies({
                npm: !hasYarn,
                bower: false,
                yarn: hasYarn,
                skipMessage: yeoman.options['skip-install-message'],
                skipInstall: yeoman.options['skip-install']
            });

        } else {

            if (packageManager === 'pnpm') {

                const hasPnpm = commandExists('pnpm');

                if (hasPnpm) {
                    yeoman.spawnCommand('pnpm', ['install']);
                } else {
                    throw "Cannot find pnpm";
                }

            } else {

                throw 'Error: Package Manager not defined ' + packageManager;

            }

        }

    },
    writeTemplates(yeoman) {

        const yorcPath = yeoman.destinationPath('.yo-rc.json'),
            spfxConfigPath = yeoman.destinationPath('./config/config.json'),
            spfxNS = '@microsoft/generator-sharepoint';

        if (fs.existsSync(yorcPath)) {

            let yoConfig = JSON.parse(
                fs.readFileSync(yorcPath, 'utf-8')
            );

            if (yoConfig[spfxNS] === undefined) {
                return
            }


            let environment = yoConfig[spfxNS].environment,
                componentType = yoConfig[spfxNS].componentType === 'webpart' ? yoConfig[spfxNS].componentType : yoConfig[spfxNS].extensionType.toLowerCase(),
                templatePath = componentType + '-' + environment + '/';

            let spfxConfig = JSON.parse(
                fs.readFileSync(spfxConfigPath)
            );

            let spfxItems = spfxConfig.bundles[
                Object.keys(
                    spfxConfig.bundles
                )[0]
            ].components;

            let spfxItem = spfxItems[spfxItems.length - 1];

            let manifestPath = spfxItem.manifest,
                entrypoint = spfxItem.entrypoint,
                entrySrc = entrypoint.replace(/\/lib\//g, '/src/')
                .replace('.js', '.ts');

            if (manifestPath !== undefined) {

                if (fs.existsSync(yeoman.destinationPath(manifestPath))) {

                    // remove comments from malicous SPFx json
                    let manifestContent =
                        removeJsonComments(
                            fs.readFileSync(yeoman.destinationPath(manifestPath), 'utf-8')
                        );

                    let manifest = JSON.parse(manifestContent);

                    let templateContent = fs.readFileSync(
                        yeoman.templatePath(templatePath + '{componentClassName}.ts'),
                        'utf-8'
                    )

                    let injectedContent = ejs.render(templateContent, {
                        componentClassName: manifest.alias,
                        componentNameCamelCase: manifest.alias,
                        componentStrings: manifest.alias
                    })

                    fs.writeFileSync(entrySrc, injectedContent);

                }

            }

        }

    }

}
