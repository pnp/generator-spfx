'use strict'
// include nodejs fs
const fs = require('fs');
// include chalk
const chalk = require('chalk');
// load ejx rendering engine
const ejs = require('ejs');
// check if command-exists
const commandExists = require('command-exists').sync;
// nodejs path
const path = require('path');

// loadash
const _ = require('lodash');
// parameter case
const paramCase = require('param-case');

// styles
const fgYellow = chalk.yellow;


// TODO: Needs to get updated
// Helper function to sore properties in package.json primarly
const sortProps = (dependencies) => {

    var sortedObject = {};
    let sortedKeys = Object.keys(dependencies).sort();

    for (var i = 0; i < sortedKeys.length; i++) {
        sortedObject[sortedKeys[i]] = dependencies[sortedKeys[i]]
    }

    return sortedObject;

}

class Util {

    /**
     * removs all comments from a JSON file before updating
     */
    _removeJsonComments(jsonContent) {

        if (jsonContent !== undefined &&
            jsonContent !== null) {

            var commentEval = new RegExp(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm);

            return jsonContent.replace(commentEval, '');

        } else {

            return null;

        }

    }

    /**
     * Sort properties of dependencies
     */
    _sortDependencies(dependencies) {

        var sortedObject = {};
        let sortedKeys = Object.keys(dependencies).sort();

        for (var i = 0; i < sortedKeys.length; i++) {
            sortedObject[sortedKeys[i]] = dependencies[sortedKeys[i]]
        }

        return sortedObject;

    }

    /**
     * Project update check used from Office 365 cli
     */
    projectUpgrade(projectFolder, format) {

        const validFormats = ['json', 'text', 'md'];

        if (validFormats.indexOf(format) === -1) {
            throw 'Format parameter error: possible values are text, md, json'
        }

        // init instance of upgarde command
        const o365CliUpgrade = require("@pnp/office365-cli/dist/o365/spfx/commands/project/project-upgrade.js");

        // change current folder in process to project folder
        process.chdir(projectFolder);

        // store log result or error
        let upgradeCheckResult = {
            log: null,
            error: null
        }

        // create a new command instance to check the project
        const cmdInstance = {
            log: (result) => {
                upgradeCheckResult.log = result
            },
            error: (err) => {
                if (err !== undefined) {
                    upgradeCheckResult.error = err;
                }
            }
        }

        // define upgrade settings of current solution
        const upgradeSettings = {
            options: {
                toVersion: this.generatorVersion,
                projectRootPath: projectFolder,
                output: format
            }
        }

        // execute the update check
        o365CliUpgrade.commandAction(
            cmdInstance,
            upgradeSettings,
            (err) => {
                cmdInstance.error(err);
            });

        return upgradeCheckResult;

    }

    /**
     * Merge addons in package.json
     */
    mergeAddons(addonConfig, requestedLibraries, config) {

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

    }

    /**
     * compose new gulp file and adds additional stuff
     */
    composeGulpFile(coreTemplate, customTemplate, outPutfile, options) {

        if (!fs.existsSync(coreTemplate)) {
            const error = 'Error: File names ' + coreTemplate + ' cannot be found';
            throw error;
        }

        if (!fs.existsSync(customTemplate)) {
            const error = 'Error: File names ' + customTemplate + ' cannot be found';
            throw error;
        }

        let coreTemplatContent = fs.readFileSync(coreTemplate, 'utf-8');

        let customTemplateContent = fs.readFileSync(customTemplate, 'utf-8');

        // Pass the path options fro EJS Template
        options.path = path.join(__dirname,
            '../app/templates/gulptasks/');

        if (options) {

            // Custom template with options
            customTemplateContent = ejs.render(customTemplateContent, options);

        }

        let gulpGileContent = ejs.render(coreTemplatContent, {
            customTasks: customTemplateContent,
            SpfxOptions: options.SpfxOptions !== undefined ? options.SpfxOptions : {},
            options: options
        });

        try {

            fs.writeFileSync(outPutfile, gulpGileContent, 'utf-8');

        } catch (error) {

            throw error;

        }



    }

    /**
     * Install handler in generator
     */
    runInstall(yeoman) {

        let packageManager = yeoman.options['package-manager'];

        if (packageManager === undefined ||
            packageManager.toLowerCase() === 'npm' ||
            packageManager.toLowerCase() === 'yarn') {

            let hasYarn = commandExists('yarn');

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

    }

    /**
     * React version detections
     */
    detectReactVersion(yeoman) {

        if (fs.existsSync(yeoman.destinationPath('package.json'))) {

            let config = fs.readFileSync(
                yeoman.destinationPath('package.json'),
                'utf-8'
            );

            const regReact15 = new RegExp(/react("|'|\ ):(\ |"|')*15./gi),
                regReact16 = new RegExp(/react("|'|\ ):(\ |"|')*16./gi);

            let targetReact = undefined;

            if (config.match(regReact15) !== null) {
                targetReact = "react15";
            }

            if (config.match(regReact16) !== null) {
                targetReact = "react16";
            }

            return targetReact;

        } else {

            throw new Exception("Config couldn't be found");

        }

    }

    /**
     * Check if option is available in SPFx for older versions
     * @param {Array} options
     * @param {boolean} legacy
     */
    checkForLegacySupport(options, environment) {

        let legacy = false;

        if (environment === 'onprem') {
            legacy = true;
        }

        return options.filter(item => {

            if (item.legacySupport === undefined) {
                return {
                    name: item.name,
                    value: item.value
                }
            }

            if (legacy === true && item.legacySupport === true) {
                return {
                    name: item.name,
                    value: item.value
                };
            }

            if (legacy === false) {
                return {
                    name: item.name,
                    value: item.value
                }
            }

        })

    }

    /**
     * Returns component name that last created
     * @param {*} componentClassName
     * @param {*} componentType
     */
    getComponentName(componentClassName, componentType) {
        let componentName = componentClassName;
        if (componentType.toLowerCase() === 'listviewcommandset') {
            componentName = componentName.slice(0, componentName.toLowerCase().lastIndexOf('commandset'));
        } else {
            componentName = componentName.slice(0, componentName.toLowerCase().lastIndexOf(componentType.toLowerCase()));
        }

        return componentName;
    }

    /**
     * returns the current componentManifest of the project
     * @param {*} yeoman
     */
    getComponentManifest(yeoman) {

        const yorcPath = yeoman.destinationPath('.yo-rc.json'),
            spfxConfigPath = yeoman.destinationPath('./config/config.json'),
            spfxNS = '@microsoft/generator-sharepoint',
            pnpNS = '@pnp/generator-spfx',
            spfxTemplateFolder = './spfx/';

        if (!fs.existsSync(yorcPath)) {
            return null;
        }

        let yoConfig = JSON.parse(
            fs.readFileSync(yorcPath, 'utf-8')
        );

        if (yoConfig[pnpNS] === undefined) {
            const pnpConfig = JSON.parse(
                fs.readFileSync(`${path.dirname(yeoman.destinationPath())}/.yo-rc.json`, 'utf-8')
            );
            _.merge(yoConfig, pnpConfig);
        }

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
            this._removeJsonComments(
                fs.readFileSync(yeoman.destinationPath(manifestPath), 'utf-8')
            );

        // declare manifest content
        let manifest;

        try {

            manifest = JSON.parse(manifestContent);
            // Adding basefolder of componente
            manifest._componentPath = 'this.componentPath contains path to the component';
            manifest.componentPath = path.dirname(entrySrc);
            manifest._componentFile = 'this.componentFile contains path to the main file of component';
            manifest.componentMainFile = entrySrc;
            manifest._templatePath = 'this.templatePath contains path to find template of component';
            manifest.templatePath = templatePath;
            manifest._componentClassName = 'this.componentClassName contains path to real class name of the file';
            manifest.componentClassName = path.basename(entrySrc, path.extname(entrySrc));
            manifest._componentName = 'this.componentName contains class name as it was entered by user, without SPFx component type prefix (a.k.a WebPart, CommandSet, etc.)';
            manifest.componentName = this.getComponentName(manifest.componentClassName, componentType);

        } catch (error) {

            yeoman.log(error);
            return null;

        }

        return manifest;

    }

    /**
     * Writes template files to the proeject folder
     */
    _writeTemplateFile(yeoman, sourcePath, targetPath, ejsInject) {

        // Reading Source FIle
        let tmplContent = fs.readFileSync(sourcePath, 'utf-8');
        let fileRelativePath = path.relative(yeoman.destinationPath(''), targetPath);
        // Generate new Content
        let generatedContent = ejs.render(tmplContent, ejsInject);

        yeoman.log(chalk.green('   update'), fileRelativePath);

        fs.writeFileSync(targetPath, generatedContent);

    }

    /**
     * deploy templates
     * @param {*} yeoman
     * @param {*} injections
     */
    deployTemplates(yeoman, injections) {

        const component = this.getComponentManifest(yeoman);

        if (component === null) {
            return null;
        }

        const templatePath = yeoman.templatePath(component.templatePath);

        const ejsInject = {
            componentClassName: component.componentClassName,
            componentClassNameKebabCase: paramCase(component.componentClassName),
            componentNameCamelCase: component.componentClassName,
            componentStrings: component.componentClassName + 'Strings',
            componentPath: component.componentPath,
            componentName: component.componentName
        };

        Object.assign(ejsInject, injections);

        this.deployTemplatesToPath(yeoman, ejsInject, templatePath, component.componentPath);
    }

    /**
     * Deploy templates to file
     * @param {*} yeoman
     * @param {*} injections
     * @param {*} templatePath
     * @param {*} targetDir
     */
    deployTemplatesToPath(yeoman, injections, templatePath, targetDir) {
        targetDir = targetDir
            .replace('{componentClassName}', injections.componentClassName)
            .replace('{componentClassNameKebabCase}', injections.componentClassNameKebabCase)
            .replace('{componentName}', injections.componentName);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }

        const files = fs.readdirSync(templatePath);
        files.forEach(file => {

            // Source Path
            let sourcePath = yeoman.templatePath(
                path.join(templatePath, file)
            );

            // Check if current 'file' is a directory
            if (fs.lstatSync(sourcePath).isDirectory()) {
                const targetPath = path.join(targetDir, path.basename(sourcePath));
                this.deployTemplatesToPath(yeoman, injections, sourcePath, targetPath);
            } else {

                // Generate filename dynamically
                let fileName = file
                    .replace('{componentClassName}', injections.componentClassName)
                    .replace('{componentClassNameKebabCase}', injections.componentClassNameKebabCase)
                    .replace('{componentName}', injections.componentName);

                // generate target destination file path
                let targetFile = yeoman.destinationPath(
                    path.join(targetDir, fileName)
                );

                this._writeTemplateFile(yeoman, sourcePath, targetFile, injections);

            }

        })

    }

    /**
     * performs a project update check
     * @param {*} yeoman
     * @param {*} projectFolder
     * @param {*} generatorVersion
     */
    projectStatusCheck(yeoman, projectFolder, generatorVersion) {

        if (yeoman.options.skipVersionCheck) {
            return true;
        }

        const checkResult = projectUpgrade(projectFolder, 'json');

        if (checkResult.error !== null &&
            checkResult.error.code === 6) {

            yeoman.log(chalk.green(checkResult.error.message))

            return true;

        } else {

            yeoman.log(
                fgYellow('!!! Project needs to be upgraded !!!')
            );

            const mdLog = projectUpgrade(projectFolder, 'md');

            fs.writeFileSync('upgrade-log.md', mdLog.log, 'utf-8');

            yeoman.log('> Please review the file ', fgYellow("upgrade-log.md"), ' in the project root.\n');

            return false;

        }

    }

}

module.exports = new Util();
