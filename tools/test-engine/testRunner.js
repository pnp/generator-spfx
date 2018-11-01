class TestRunner {
    constructor() {};

    run(testSuite) {

        /**
         * File System Helpers
         */
        // const fs = require('fs');
        const path = require('path');
        // const rimraf = require('rimraf');
        // const EventEmitter = require('events');
        /**
         * Helpers yeoman test suite
         */
        // let helpers = require('yeoman-test');
        let assert = require('yeoman-assert');
        /**
         * Test folder setup
         */
        const tempDir = path.join(__dirname, '../../testresult/');

        /**
         * Clean up test definitions form require cache
         */
        const clearYeomanCache = () => {

            Object.keys(require.cache).forEach(function (key) {
                if (key.indexOf("yeoman-test") !== -1 ||
                    key.indexOf("yeoman-assert") !== -1 ||
                    key.indexOf("@microsoft") !== -1) {
                    try {
                        delete require.cache[key];
                    } catch (error) {
                        console.log(error);
                    }
                }
            });

        }

        // Run all Tests sequential
        const testSuiteName =
            `Test Suite: ${testSuite.name}, Framework: ${testSuite.framework}, Environment: ${testSuite.environment}, Component: ${testSuite.component.componentType} ${testSuite.component.componentType == "extension" ? testSuite.component.extensionType : ''}`;

        testSuite.definitions.forEach(definition => {

            describe(testSuiteName, (done) => {

                let userWebPartConfig = {
                    componentDescription: 'HelloWorld',
                    componentName: 'helloworld',
                    solutionName: 'HelloWorld',
                    environment: testSuite.environment,
                    skipVersionCheck: true,
                    testRun: true
                };

                if (testSuite.component !== undefined) {

                    Object.keys(testSuite.component)
                        .forEach(key => {

                            userWebPartConfig[key] = testSuite.component[key];

                        });

                } else {

                    userWebPartConfig.componentType = 'webpart';

                }

                let baseSettings = {
                    framework: testSuite.framework,
                }
                /**
                 * Test Bench
                 */
                let TestBench = require('./testbench');
                let userTestConfig = Object.assign({}, baseSettings, definition.specifics);

                let yoTestBench = new TestBench(userWebPartConfig, userTestConfig);

                before((done) => {

                    yoTestBench.run()
                        .catch(() => {
                            reject();
                        })
                        .then(() => {
                            clearYeomanCache();
                            done();
                        })

                    // })

                })

                definition.test.forEach(test => {

                    it(test.name, () => {

                        let filePath = path.resolve(tempDir, test.file);

                        switch (test.type) {
                            case yoTestBench.types.fileContent:
                                assert.fileContent(filePath, test.expr);
                                break;
                            case yoTestBench.types.noFileContent:
                                assert.noFileContent(filePath, test.expr);
                                break;
                            case yoTestBench.types.file:
                                assert.file(filePath);
                                break;
                            case yoTestBench.types.noFile:
                                assert.noFile(filePath);
                                break;
                            default:
                                break;
                        }

                    })

                })

            });

        })

    }

}

module.exports = TestRunner;
