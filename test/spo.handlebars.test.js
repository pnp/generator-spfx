const requiredGenerators = require('./settings/spfxgenerators.js');
const fs = require('fs');
const assert = require('yeoman-assert');
const rimraf = require('rimraf');
const path = require('path');

const helpers = require('yeoman-test');

const tempDir = path.join(__dirname, '../testresult/'),
    localTempDir = path.join(tempDir, '.'),
    localTempDirDelete = path.join(tempDir, '{*,.*}');

const userWebPartConfig = {
    componentType: 'webpart',
    componentDescription: 'HelloWorld',
    componentName: 'helloworld',
    solutionName: 'HelloWorld2',
    environment: 'spo',
};

let yorcFile = path.join(localTempDir, '.yo-rc.json'),
    packageFile = path.join(localTempDir, 'package.json');

describe('HandleBarsJS: Test SPO', () => {

    const baseSettings = {
        framework: 'handlebars',
    }

    const testGenerator = (testConfig, webPartConfig) => {

        return new Promise(function (resolve, reject) {
            // try {
            helpers.setUpTestDirectory(localTempDir);

            helpers.run(path.join(__dirname, '../app'))
                .inDir(localTempDir)
                .withGenerators(
                    requiredGenerators
                )
                .withOptions(webPartConfig) // Mock options passed in
                .withLocalConfig({})
                .withPrompts(testConfig)
                .on('error', (err) => {
                    console.log('ERROR: ', err);
                    reject();
                })
                .on('end', () => {
                    resolve();
                });

        });

    };

    describe('Handlenars + JQuery 2.x', () => {

        const userTestConfig = Object.assign({}, baseSettings, {
            jsLibrary: ['jquery'],
            jQueryVersion: 2,
            force: true
        });

        before((done) => {

            rimraf(
                localTempDir + '{*,.*}',
                () => {

                    runningGenerator = testGenerator(userTestConfig, userWebPartConfig);

                    runningGenerator
                        .catch((error) => {
                            console.log('ERROR: ', error);
                            done();
                        })
                        .then(() => {

                            done();

                        })

                }
            );


        })

        it('No Environment === SPO', () => {

            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('No ReactJS', () => {

            assert.noFileContent(packageFile, /react/);

        })

        it('No ReactJS Dom', () => {

            assert.noFileContent(packageFile, /react-dom/);

        })

        it('no knockout', () => {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('no pnpjs', () => {

            assert.noFileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('jquery 2.x', () => {

            assert.fileContent(packageFile, /\"jquery\": \"\^2\./);

        })

    });

    describe('Handlebars + jquery 3.x', () => {

        const userTestConfig = Object.assign({}, baseSettings, {
            jsLibrary: ['jquery'],
            jQueryVersion: 3,
            force: true
        });

        before((done) => {

            rimraf(
                localTempDir + '{*,.*}',
                () => {

                    runningGenerator = testGenerator(userTestConfig, userWebPartConfig);

                    runningGenerator
                        .catch((error) => {
                            console.log('ERROR: ', error);
                            done();
                        })
                        .then(() => {

                            done();

                        })

                }
            );


        })

        it('No Environment === SPO', () => {

            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('No ReactJS', () => {

            assert.noFileContent(packageFile, /react/);

        })

        it('No ReactJS Dom', () => {

            assert.noFileContent(packageFile, /react-dom/);

        })

        it('no knockout', () => {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('no pnpjs', () => {

            assert.noFileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('jquery 3.x', () => {

            assert.fileContent(packageFile, /\"jquery\": \"\^3\./);

        })

    });

    describe('Handlebars + pnpjs', () => {

        const userTestConfig = Object.assign({}, baseSettings, {
            jsLibrary: ['pnpjs'],
            force: true
        });

        before((done) => {

            rimraf(
                localTempDir + '{*,.*}',
                () => {

                    runningGenerator = testGenerator(userTestConfig, userWebPartConfig);

                    runningGenerator
                        .catch((error) => {
                            console.log('ERROR: ', error);
                        })
                        .then(() => {
                            done();

                        })

                }
            );


        })

        it('No Environment === SPO', () => {

            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('No ReactJS', () => {

            assert.noFileContent(packageFile, /react/);

        })

        it('No ReactJS Dom', () => {

            assert.noFileContent(packageFile, /react-dom/);

        })

        it('no knockout', () => {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('pnpjs', () => {

            assert.fileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('no jquery 2.x', () => {

            assert.noFileContent(packageFile, /\"jquery\": \"\^2\./);

        })

    });

    describe('Handlebars + jquery 2.x + pnpjs', () => {

        const userTestConfig = Object.assign({}, baseSettings, {
            jsLibrary: ['jquery', 'pnpjs'],
            jQueryVersion: 2,
            force: true
        });

        before((done) => {

            rimraf(
                localTempDir + '{*,.*}',
                () => {

                    runningGenerator = testGenerator(userTestConfig, userWebPartConfig);

                    runningGenerator
                        .catch((error) => {
                            console.log('ERROR: ', error);
                        })
                        .then(() => {
                            done();

                        })

                }
            );


        })

        after(() => {
            rimraf.sync(localTempDirDelete);
        });

        it('No Environment === SPO', () => {

            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('No ReactJS', () => {

            assert.noFileContent(packageFile, /react/);

        })

        it('No ReactJS Dom', () => {

            assert.noFileContent(packageFile, /react-dom/);

        })

        it('no knockout', () => {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('pnpjs', () => {

            assert.fileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('jquery 2.x', () => {

            assert.fileContent(packageFile, /\"jquery\": \"\^2\./);

        })

    });

    describe('Handlebars + jquery 3.x + pnpjs', () => {

        const userTestConfig = Object.assign({}, baseSettings, {
            jsLibrary: ['jquery', 'pnpjs'],
            jQueryVersion: 3,
            force: true
        });

        before((done) => {

            rimraf(
                localTempDir + '{*,.*}',
                () => {

                    runningGenerator = testGenerator(userTestConfig, userWebPartConfig);

                    runningGenerator
                        .catch((error) => {
                            console.log('Error: ', error);
                            done();
                        })
                        .then(() => {
                            done();

                        })

                }
            );


        })

        it('No Environment === SPO', () => {

            assert.fileContent(yorcFile, /\"environment\": \"spo\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('No ReactJS', () => {

            assert.noFileContent(packageFile, /react/);

        })

        it('No ReactJS Dom', () => {

            assert.noFileContent(packageFile, /react-dom/);

        })

        it('no knockout', () => {

            assert.noFileContent(packageFile, /knockout/);

        })

        it('pnpjs', () => {

            assert.fileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('jquery 3.x', () => {

            assert.fileContent(packageFile, /\"jquery\": \"\^3\./);

        })

    });

});