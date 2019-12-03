'use strict';

// Base Yeoman generator
const Generator = require('yeoman-generator');

// filesystem
const fs = require('fs');
const path = require('path');

const util = require('../../lib/util.js');

module.exports = class extends Generator {

    constructor(args, opts) {

        super(args, opts);

    }

    // Initialisation generator
    initializing() {

    }

    prompting() {}

    configuring() {}

    writing() {}

    install() {

        this._addPackageDependencies();


        if (undefined !== this.options.vetting &&
            this.options.vetting.indexOf('stylelint') !== -1) {

            this._addStylelintConfig();
        }


        if (this._isAzureCiPreview()) {
            this._addContinuousConfigPreview();
        } else if (this._isAzureCi()) {
            this._addContinuousConfig();
        }

        this._addToolScripts();


    }

    end() {
        // Jest configuration
        let jestFileDestPath = 'config/jest.config.json';
        let jestFileSourcePath = 'jest.config.json';
        let jestFileDestFullPath = path.resolve(this.destinationPath(jestFileDestPath));
        let jestFileAlreadyExists = fs.existsSync(jestFileDestFullPath);

        if (this._isJestTesting() && (this._isAzureCi() || this._isAzureCiPreview())) {
            if (jestFileAlreadyExists === true) {
                let currentConfiguration = JSON.parse(fs.readFileSync(this.destinationPath(jestFileDestPath), 'utf8'));
                let additionalConfiguration = JSON.parse(fs.readFileSync(this.templatePath(jestFileSourcePath), 'utf8'));
                Object.assign(additionalConfiguration, currentConfiguration);
                fs.writeFileSync(this.destinationPath(jestFileDestPath), JSON.stringify(additionalConfiguration), {
                    encoding: 'utf8',
                });
            } else { // post install didn't happen, best effort
                this.fs.copy(
                    this.templatePath(jestFileSourcePath),
                    this.destinationPath(jestFileDestPath)
                );
            }
        }
    }

    _isAzureCi() {
        return this.options.ci && this.options.ci.indexOf('azure') !== -1;
    }

    _isAzureCiPreview() {
        return this.options.ci && this.options.ci.indexOf('azure-preview') !== -1;
    }

    _isJestTesting() {
        return this.options.testFramework && this.options.testFramework.indexOf('jest') !== -1;
    }

    _addToolScripts() {

        this.fs.copy(
            this.templatePath('./tools/pre-version.js'),
            this.destinationPath('./tools/pre-version.js')
        );

    }

    _addPackageDependencies() {

        if (fs.existsSync(this.destinationPath('package.json'))) {

            let config = JSON.parse(fs.readFileSync(
                this.destinationPath('package.json')
            ));

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

            // define all requested libraries
            let requestedLibraries = this.options.libraries === undefined ? [] : this.options.libraries;

            // append vetting options if selected
            requestedLibraries = this.options.vetting === undefined ? requestedLibraries :
                requestedLibraries.concat(this.options.vetting);

            // Append Azure DevOps options if selected
            requestedLibraries = (this._isJestTesting() && (this._isAzureCi() || this._isAzureCiPreview())) ?
                requestedLibraries.concat('continuousIntegrationJest') : requestedLibraries;

            // Add gulp-sequence for gulp dist automatically
            requestedLibraries.push('gulp-sequence');

            if (requestedLibraries.indexOf('csscomb') !== -1) {

                this.fs.copy(
                    this.templatePath('.csscomb.json'),
                    this.destinationPath('.csscomb.json')
                );

            }

            // merge all options and check if gulpfile is required
            let newPkgConfig = util.mergeAddons(addonConfig, requestedLibraries, config);

            // add pre-version script to package.json
            if (newPkgConfig.scripts !== undefined) {
                // add preversion script
                if (newPkgConfig.scripts.preversion === undefined) {

                    newPkgConfig.scripts.preversion = "node ./tools/pre-version.js";

                } else {

                    newPkgConfig.scripts.preversion += " && node ./tools/pre-version.js";

                }
                // add postversion scripts
                if (newPkgConfig.scripts.postversion === undefined) {

                    newPkgConfig.scripts.postversion = "gulp dist";

                } else {

                    // check if gulp dist not already exists
                    if (newPkgConfig.scripts.postversion.indexOf('gulp dist') === -1) {

                        newPkgConfig.scripts.postversion += " && gulp dist";

                    }

                }
            }

            if ((this._isAzureCi() || this._isAzureCiPreview()) && this._isJestTesting()) {
                newPkgConfig["jest-junit"] = {
                    "output": "temp/test/junit/junit.xml",
                    "usePathForSuiteName": "true"
                };
            }

            fs.writeFileSync(
                this.destinationPath('package.json'),
                JSON.stringify(newPkgConfig, null, 2)
            );

            this._updateTSConfig(requestedLibraries, addonConfig);

        }

    }

    _injectToGulpFile() {

    }

    _addContinuousConfigPreview() {
        // azure pipelines configuration
        let adoSrcFileName = this._isJestTesting() ? 'azure-pipelines-build-template.yml' : 'azure-pipelines-build-template-notesting.yml';
        let adoDestFileName = 'azure-pipelines-build-template.yml';
        let previewPath = 'preview/';
        this.fs.copy(
            this.templatePath(previewPath + adoSrcFileName),
            this.destinationPath(adoDestFileName)
        );
        this.fs.copy(
            this.templatePath(previewPath + 'azure-pipelines-deploy-template.yml'),
            this.destinationPath('azure-pipelines-deploy-template.yml')
        );
        this.fs.copy(
            this.templatePath(previewPath + 'azure-pipelines.yml'),
            this.destinationPath('azure-pipelines.yml')
        );
    }

    _addContinuousConfig() {
        // azure devops configuration
        let adoSrcFileName = this._isJestTesting() ? 'azure-pipelines.yml' : 'azure-pipelines-notesting.yml';
        let adoDestFileName = 'azure-pipelines.yml';

        this.fs.copy(
            this.templatePath(adoSrcFileName),
            this.destinationPath(adoDestFileName)
        );
    }

    _addStylelintConfig() {

        this.fs.copy(
            this.templatePath('.stylelintrc'),
            this.destinationPath('.stylelintrc')
        );

    }

    _updateTSConfig(requestedLibraries, addonConfig) {

        // add tsconfig rules
        let tsConfig = fs.readFileSync(this.destinationPath('tsconfig.json'), 'UTF-8'),
            tsConfigJson = JSON.parse(tsConfig);

        requestedLibraries.forEach(item => {

            if (addonConfig[item].tsconfig !== undefined) {

                Object.keys(addonConfig[item].tsconfig).forEach((key) => {

                    tsConfigJson[key] = addonConfig[item].tsconfig[key];

                });

            }

        })
        tsConfigJson.compilerOptions.esModuleInterop = true;
        fs.writeFileSync(
            this.destinationPath('tsconfig.json'),
            JSON.stringify(tsConfigJson, null, 2)
        );

    }

}
