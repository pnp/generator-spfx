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
    environment: 'onprem',
    testRun: true
};

let yorcFile = path.join(localTempDir, '.yo-rc.json'),
    packageFile = path.join(localTempDir, 'package.json');

describe('React Test: On Premises', () => {

    const baseSettings = {
        framework: 'react',
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

    describe('React + JQuery 2.x', () => {

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

        it('ReactJS', () => {

            assert.fileContent(packageFile, /react/);

        })

        it('ReactJS Dom', () => {

            assert.fileContent(packageFile, /react-dom/);

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

    describe('React + jquery 3.x', () => {

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

        it('ReactJS', () => {

            assert.fileContent(packageFile, /react/);

        })

        it('ReactJS Dom', () => {

            assert.fileContent(packageFile, /react-dom/);

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

    describe('React + pnpjs', () => {

        const userTestConfig = Object.assign({}, baseSettings, {
            jsLibrary: ['@pnp/pnpjs'],
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

        it('ReactJS', () => {

            assert.fileContent(packageFile, /react/);

        })

        it('ReactJS Dom', () => {

            assert.fileContent(packageFile, /react-dom/);

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

    describe('React + jquery 2.x + pnpjs', () => {

        const userTestConfig = Object.assign({}, baseSettings, {
            jsLibrary: ['jquery', '@pnp/pnpjs'],
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

        it('No Environment === onprem', () => {

            assert.fileContent(yorcFile, /\"environment\": \"onprem\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('ReactJS', () => {

            assert.fileContent(packageFile, /react/);

        })

        it('ReactJS Dom', () => {

            assert.fileContent(packageFile, /react-dom/);

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

    describe('React + jquery 3.x + pnpjs', () => {

        const userTestConfig = Object.assign({}, baseSettings, {
            jsLibrary: ['jquery', '@pnp/pnpjs'],
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

        it('No Environment === onprem', () => {

            assert.fileContent(yorcFile, /\"environment\": \"onprem\",/);

        });

        it('Is Web Part', () => {

            assert.fileContent(yorcFile, /\"componentType\": \"webpart\"/);

        })

        it('package.json exists', () => {

            assert.file(packageFile);

        })

        it('ReactJS', () => {

            assert.fileContent(packageFile, /react/);

        })

        it('ReactJS Dom', () => {

            assert.fileContent(packageFile, /react-dom/);

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
