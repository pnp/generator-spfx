const assert = require('yeoman-assert');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');

const requiredGenerators = require('./settings/spfxgenerators.js');

const helpers = require('yeoman-test');

const tempDir = path.join(__dirname, '../testresult/'),
    localTempDir = path.join(tempDir, '.');

const userWebPartConfig = {
    componentType: 'webpart',
    componentDescription: 'HelloWorld',
    componentName: 'helloworld',
    solutionName: 'HelloWorld2',
    environment: 'onprem',
};

let yorcFile = path.join(localTempDir, '.yo-rc.json'),
    packageFile = path.join(localTempDir, 'package.json');

const baseSettings = {
    framework: 'knockout',
}

describe('Knockout Test: On Premises', () => {

    const testGenerator = (testConfig, webPartConfig) => {

        delete helpers;

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

    describe('Knockout + JQuery 2.x', () => {

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

        it('No Environment === onprem', () => {

            assert.fileContent(yorcFile, /\"environment\": \"onprem\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('no React', () => {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('knockout', () => {

            assert.fileContent(packageFile, /knockout/);

        })

        it('no pnpjs', () => {

            assert.noFileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('jquery 2.x', () => {

            assert.fileContent(packageFile, /\"jquery\": \"\^2\./);

        })

    });

    describe('Knockout + jquery 3.x', () => {

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

        it('No Environment === onprem', () => {

            assert.fileContent(yorcFile, /\"environment\": \"onprem\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('no React', () => {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('knockout', () => {

            assert.fileContent(packageFile, /knockout/);

        })

        it('no pnpjs', () => {

            assert.noFileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('jquery 3.x', () => {

            assert.fileContent(packageFile, /\"jquery\": \"\^3\./);

        })

    });

    describe('Knockout + pnpjs', () => {

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

        it('No Environment === onprem', () => {

            assert.fileContent(yorcFile, /\"environment\": \"onprem\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('no React', () => {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('knockout', () => {

            assert.fileContent(packageFile, /knockout/);

        })

        it('pnpjs', () => {

            assert.fileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('no jquery 2.x', () => {

            assert.noFileContent(packageFile, /\"jquery\": \"\^2\./);

        })

    });

    describe('Knockout + jquery 2.x + pnpjs', () => {

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


        it('No Environment === onprem', () => {

            assert.fileContent(yorcFile, /\"environment\": \"onprem\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('no React', () => {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('knockout', () => {

            assert.fileContent(packageFile, /knockout/);

        })

        it('pnpjs', () => {

            assert.fileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('jquery 2.x', () => {

            assert.fileContent(packageFile, /\"jquery\": \"\^2\./);

        })

    });

    describe('Knockout + jquery 3.x + pnpjs', () => {

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
                            console.log('ERROR: ', error);
                        })
                        .then(() => {
                            done();

                        })

                }
            );


        })


        it('No Environment === onprem', () => {

            assert.fileContent(yorcFile, /\"environment\": \"onprem\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('no React', () => {

            assert.noFileContent(packageFile, /react|react-dom/);

        })

        it('knockout', () => {

            assert.fileContent(packageFile, /knockout/);

        })

        it('pnpjs', () => {

            assert.fileContent(packageFile, /@pnp\/pnpjs/);

        })

        it('jquery 3.x', () => {

            assert.fileContent(packageFile, /\"jquery\": \"\^3\./);

        })

    });

});