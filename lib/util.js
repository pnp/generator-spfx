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
            packageManager.toLowerCase() === 'npm' ||
            packageManager.toLowerCase() === 'yarn') {

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
                    throw 'Cannot find pnpm';
                }

            } else {

                throw 'Error: Package Manager not defined ' + packageManager;

            }

        }

    },
    getComponentManifest(yeoman) {

        const yorcPath = yeoman.destinationPath('.yo-rc.json'),
            spfxConfigPath = yeoman.destinationPath('./config/config.json'),
            spfxNS = '@microsoft/generator-sharepoint',
            spfxTemplateFolder = './spfx/';

        if (!fs.existsSync(yorcPath)) {
            return null;
        }

        let yoConfig = JSON.parse(
            fs.readFileSync(yorcPath, 'utf-8')
        );

        if (yoConfig[spfxNS] === undefined) {
            return null;
        }

        let spfxScope = yoConfig[spfxNS],
            environment = spfxScope.environment,
            componentType = spfxScope.componentType === 'webpart' ? spfxScope.componentType : spfxScope.extensionType.toLowerCase(),
            templatePath = spfxTemplateFolder + componentType + '-' + environment + '/';

        // Currently not supported for on-premises
        if (environment === 'onprem') {
            yeoman.log('On-Premises components are currently not supported to inject code automatically')
            return null;
        }

        let spfxConfigContent =
            fs.readFileSync(spfxConfigPath, 'utf-8')

        let spfxConfig = JSON.parse(spfxConfigContent);

        if (spfxConfig.bundles === undefined) {
            yeoman.log('no bundles defined');
            return null;
        }

        const bundles = Object.keys(
            spfxConfig.bundles
        );

        let spfxItem = spfxConfig.bundles[
            bundles[
                bundles.length - 1
            ]
        ].components[0];

        let manifestPath = spfxItem.manifest,
            entrypoint = spfxItem.entrypoint,
            entrySrc = entrypoint.replace(/\/lib\//g, '/src/')
            .replace('.js', '.ts');

        if (manifestPath === undefined) {
            return null;
        }

        if (!fs.existsSync(yeoman.destinationPath(manifestPath))) {
            return null;
        }

        // remove comments from malicous SPFx json
        let manifestContent =
            removeJsonComments(
                fs.readFileSync(yeoman.destinationPath(manifestPath), 'utf-8')
            );

        // declare manifest content
        let manifest;

        try {

            manifest = JSON.parse(manifestContent);
            // Adding basefolder of componente
            manifest._componentPath = 'this.componentPath contains path to the component'
            manifest.componentPath = path.dirname(entrySrc);
            manifest._componentFile = 'this.componentFile contains path to the main file of component'
            manifest.componentMainFile = entrySrc;
            manifest._templatePath = 'this.templatePath contains path to find template of component'
            manifest.templatePath = templatePath;

        } catch (error) {

            yeoman.log(error);
            return null;

        }

        return manifest;

    },
    _writeTemplateFile(yeoman, sourcePath, targetPath, ejsInject) {

        // Reading Source FIle
        let tmplContent = fs.readFileSync(sourcePath, 'utf-8');
        let fileName = path.basename(targetPath);
        // Generate new Content
        let generatedContent = ejs.render(tmplContent, ejsInject);

        yeoman.log('     Try to write ... ', fileName);

        fs.writeFileSync(targetPath, generatedContent);

    },
    _updateSubTemplates(yeoman, ejsInject, subPath) {

        fs.readdir(subPath, (error, files) => {

            files.forEach(file => {

                // Source Path
                let sourcePath = yeoman.templatePath(
                    path.join(subPath, file)
                );

                // Generate filename dynamically 
                let fileName = file.replace('{componentClassName}', ejsInject.componentClassName);

                // generate targe destination file path
                let targetDir = yeoman.destinationPath(
                    path.join(
                        ejsInject.componentPath, 
                        path.basename(subPath)
                    )
                ),
                targetFile = path.join(targetDir, fileName);

                // Check if target folder exists
                if(!fs.existsSync(targetDir)){
                    fs.mkdirSync(targetDir);   
                }

                this._writeTemplateFile(yeoman, sourcePath, targetFile, ejsInject);

            })

        })

    },
    deployTemplates(yeoman) {

        const component = this.getComponentManifest(yeoman);

        if (component === null) {
            return;
        }

        const templatePath = yeoman.templatePath(component.templatePath);

        const ejsInject = {
            componentClassName: component.alias,
            componentNameCamelCase: component.alias,
            componentStrings: component.alias+'Strings',
            componentPath: component.componentPath,
        };

        fs.readdir(templatePath, (error, files) => {

            files.forEach(file => {

                // Source Path
                let sourcePath = yeoman.templatePath(
                    path.join(templatePath, file)
                );

                // Check if current 'file' is a directory
                if (fs.lstatSync(sourcePath).isDirectory()) {

                    this._updateSubTemplates(yeoman, ejsInject, sourcePath);

                } else {

                    // Generate filename dynamically 
                    let fileName = file.replace('{componentClassName}', component.alias);

                    // generate targe destination file path
                    let targetFile = yeoman.destinationPath(
                        path.join(component.componentPath, fileName)
                    );
                    
                    this._writeTemplateFile(yeoman, sourcePath, targetFile, ejsInject);

                }

            })

        })

    }
}
