'use strict'

// incldue nodejs fs
const fs = require('fs');
// load ejx rendering engine
const ejs = require('ejs');
// check if command-exists
const commandExists = require('command-exists').sync;
const path = require('path');
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

// processes template folder
const processTemplateFolder = (yeoman, folderPath, destinationPath, componentName, componentClassName) => {
    if (!fs.existsSync(folderPath)) {
        return;
    }

    fs.readdirSync(folderPath).forEach((item) => {
        const fullPath = path.join(folderPath, item);
        if (fs.lstatSync(fullPath).isDirectory()) {
            const newDestination = path.join(destinationPath, item);
            if (!fs.existsSync(newDestination)) {
                fs.mkdirSync(newDestination);
            }
            processTemplateFolder(yeoman, fullPath, newDestination, componentName, componentClassName);
        }
        else {
            const templateContent = fs.readFileSync(
                fullPath,
                'utf-8'
            );
            const injectedContent = ejs.render(templateContent, {
                componentClassName: componentClassName,
                componentNameCamelCase: componentClassName,
                componentStrings: componentClassName,
                componentName: componentName
            });

            let destinationFileName = item;
            destinationFileName = destinationFileName.replace(/\{componentName\}/g, componentName);
            destinationFileName = destinationFileName.replace(/\{componentClassName\}/g, componentClassName);

            fs.writeFileSync(path.join(destinationPath, destinationFileName), injectedContent);
        }
    });
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
            spfxNS = '@microsoft/generator-sharepoint',
            spfxTemplateFolder = './spfx/';

        if (fs.existsSync(yorcPath)) {

            let yoConfig = JSON.parse(
                fs.readFileSync(yorcPath, 'utf-8')
            );

            if (yoConfig[spfxNS] === undefined) {
                return
            }

            let spfxScope = yoConfig[spfxNS],
                environment = spfxScope.environment,
                componentType = spfxScope.componentType === 'webpart' ? spfxScope.componentType : spfxScope.extensionType.toLowerCase(),
                templatePath = spfxTemplateFolder + componentType + '-' + environment + '/';

            // Currently not supported for on-premises
            if(environment === 'onprem'){
                return;
            }

            let spfxConfigContent =
                fs.readFileSync(spfxConfigPath, 'utf-8')

            let spfxConfig = JSON.parse(spfxConfigContent);

            if (spfxConfig.bundles === undefined) {
                console.error('no bundles defined');
                return;
            }

            const bundles = Object.keys(spfxConfig.bundles);


            let spfxItems = spfxConfig.bundles[
                bundles[bundles.length - 1]
            ].components;

            let spfxItem = spfxItems[spfxItems.length - 1];

            let manifestPath = spfxItem.manifest,
                entrypoint = spfxItem.entrypoint;
            entrypoint = entrypoint.replace(/\/lib\//g, '/src/');
            entrypoint = entrypoint.slice(0, entrypoint.lastIndexOf('/'));

            if (manifestPath !== undefined) {

                if (fs.existsSync(yeoman.destinationPath(manifestPath))) {

                    // remove comments from malicous SPFx json
                    let manifestContent =
                        removeJsonComments(
                            fs.readFileSync(yeoman.destinationPath(manifestPath), 'utf-8')
                        );

                    let manifest = JSON.parse(manifestContent);
                    const componentClassName = manifest.alias;
                    let componentName = componentClassName;
                    const extensionType = manifest.extensionType;
                    if (extensionType) {
                        // for Command Set the naming is a bit different
                        if (extensionType === 'ListViewCommandSet') {
                            componentName = componentName.slice(0, componentName.lastIndexOf('CommandSet'));
                        }
                        else {
                            componentName = componentName.slice(0, componentName.toLowerCase().lastIndexOf(extensionType.toLowerCase()));
                        }
                    }
                    else {
                        componentName = componentName.slice(0, componentName.toLowerCase().lastIndexOf(componentType.toLowerCase()));
                    }

                    processTemplateFolder(yeoman, yeoman.templatePath(templatePath), 
                        entrypoint, componentName, componentClassName);

                    /*let templateContent = fs.readFileSync(
                        yeoman.templatePath(templatePath + '{componentClassName}.ts'),
                        'utf-8'
                    );

                    // TODO: iterate through all files in the folder and add them to dest
                    //
                    let injectedContent = ejs.render(templateContent, {
                        componentClassName: componentClassName,
                        componentNameCamelCase: componentClassName,
                        componentStrings: componentClassName,
                        componentName: componentName
                    });

                    fs.writeFileSync(entrySrc, injectedContent);*/

                }

            }

        }

    },
    // adds dependencies and devDependencies to the package.json
    addPackageDependencies: (yeoman, requestedLibraries) => {
        if (fs.existsSync(yeoman.destinationPath('package.json'))) {

            // request the default package file
            let config;

            try {
                config = JSON.parse(fs.readFileSync(
                    yeoman.destinationPath('package.json')
                ));

            } catch (error) {

                throw error;

            }

            // request current addon configuration
            let addonConfig;

            try {
                addonConfig = JSON.parse(
                    fs.readFileSync(
                        yeoman.templatePath('addonConfig.json')
                    )
                )
            } catch (err) {

                throw err;

            }

            // declare new package config file
            let newPkgConfig;

            try {
                newPkgConfig = module.exports.mergeAddons(addonConfig, requestedLibraries, config);

            } catch (error) {

                throw error

            }

            // if content could be added to the new package.json write it
            if (newPkgConfig !== undefined && newPkgConfig !== null) {

                fs.writeFileSync(
                    yeoman.destinationPath('package.json'),
                    JSON.stringify(newPkgConfig, null, 2)
                );

            } else {

                throw 'Updated package.json file is invalid.';

            }

        }
    },

    injectToGulpFile: (yeoman) => {
        let targetGulpFile = yeoman.destinationPath('gulpfile.js');

        if (fs.existsSync(targetGulpFile)) {

            let coreGulpTemplate = yeoman.templatePath('../../../app/templates/gulpfile.js');
            let customGulpTemplate = yeoman.templatePath('./gulpfile.js');


            try {

                module.exports.composeGulpFile(coreGulpTemplate, customGulpTemplate, targetGulpFile);

            } catch (error) {

                yeoman.log(error);

            }

        }
    }

}
