const path = require('path');
const rimraf = require('rimraf');

const baseDir = "../../";

const requiredGenerators = require(
    path.resolve(__dirname, 'spfxgenerators.js')
);

const tempDir = path.join(__dirname, baseDir, 'testresult/'),
    localTempDir = path.join(tempDir, '.'),
    localTempDirDelete = path.join(tempDir, '**/{*,.*}');

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

class TestBench {

    constructor(projectConfig, promptConfig) {

        this.promptConfig = promptConfig;
        this.projectConfig = projectConfig;

        const core = require('./coreTestDefinition');

        this.fileContent = core.FileContent;
        this.types = core.TestType;

    }

    get Types() {
        return this.types;
    }

    runGenerator(projectConfig, promptConfig) {

        const helpers = require('yeoman-test');

        return new Promise(function (resolve, reject) {

            helpers.setUpTestDirectory(localTempDir);

            helpers.run(path.join(__dirname, baseDir, 'app'))
                .inDir(localTempDir)
                .withGenerators(
                    requiredGenerators
                )
                .withOptions(projectConfig) // Mock options passed in
                .withLocalConfig({})
                .withPrompts(promptConfig)
                .on('error', (err) => {
                    reject();
                })
                .on('end', () => {
                    resolve();
                });

        });


    }

    run() {
        return new Promise((resolve, reject) => {
            rimraf(
                localTempDir + '**/{*,.*}', {
                    maxBusyTries: 10,
                    emfileWait: 2000
                },
                () => {

                    let runningGenerator = this.runGenerator(this.projectConfig, this.promptConfig);

                    runningGenerator
                        .catch((error) => {
                            reject(error);
                        })
                        .then(() => {
                            resolve();
                        })

                }
            );

        })
    }

}
module.exports = TestBench;
