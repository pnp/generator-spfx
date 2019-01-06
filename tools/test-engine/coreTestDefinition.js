"use strict";
/**
 * Defines files to check
 */
class FileContent {

    constructor() {

        this.yorc = '.yo-rc.json';
        this.package = 'package.json';

    }

}
/**
 * Mocha assert to use
 */
class TestType {

    constructor() {

        this.fileContent = "fileContent";
        this.noFileContent = "noFileContent";
        this.file = "file";
        this.noFile = "noFile";

    }

}
/**
 * Test Caee Definition to check agains generator
 */
class TestCase {

    constructor() {

        this.name = '';
        this.specifics = '';
        this.component = {};
        this.test = [];

    }

}
/**
 * Core Test definition
 */
class BaseTestCase extends TestCase {

    constructor() {

        super();

        var testType = new TestType();
        var fileContent = new FileContent();

        this.test = [{
            name: '.yo-rc.json exists?',
            file: fileContent.yorc,
            type: testType.file,
        }, {
            name: 'package.json exist?',
            file: fileContent.package,
            type: testType.file,
        }, {
            name: 'Is WebPart?',
            file: fileContent.yorc,
            expr: /\"componentType\": \"webpart\"/,
            type: testType.fileContent
        }, {
            name: 'No ReactJS',
            file: fileContent.package,
            expr: /react/,
            type: testType.noFileContent
        }, {
            name: 'No ReactJS Dom',
            file: fileContent.package,
            expr: /react-dom/,
            type: testType.noFileContent
        }, {
            name: 'No KnockoutJS',
            file: fileContent.package,
            expr: /knockout/,
            type: testType.noFileContent
        }];

        this.testNames = this.validTestNames();

    }

    validTestNames() {

        this.testNames = this.test.map(elem => {
            return elem.name;
        })
        return this.testNames;

    }

    removeTests(test2remove) {

        // just in case a single test was passed in
        if (Array.isArray(test2remove)) {

            test2remove.forEach(elem => {
                this.removeTests(elem);
            });

        } else {

            // treat singel test files

            let afterRemoval = this.test.filter(elem => {

                if (elem.name !== test2remove.name) {
                    return elem;
                }

            })

            // assign new test
            this.test = afterRemoval;

        }

    }

    addTests(test) {

        if (Array.isArray(test)) {

            this.test.push(...test);

        } else {

            this.test.push(test);

        }

    }

}
/**
 * Test Suite Definition
 */
class TestSuite {

    constructor() {

        this.name = "";
        this.environment = "";
        this.framework = '';
        this.definitions = [];
        this.baseDefinition = [];

    }

}

class TestGenerator {

    constructor(baseTest) {

        if (baseTest === null ||
            baseTest === undefined) {

            throw new Exception('Base Test are not defined');

        }

        // define Base Test
        this.baseTest = baseTest;

        // Create new Test array
        this._tests = [];

        // generate all tests
        this._generateTests();
        this._generateStyleLintTests();
        this._generateWebPackTests();

    }

    _generateTests() {

        const noJQuery = Object.assign({}, this.baseTest);
        const fileContent = new FileContent();
        const testType = new TestType();

        /**
         * No jQuery Test Definition
         */
        noJQuery.name = " No jQuery";
        noJQuery.specifics = {};
        noJQuery.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.nofileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.nofileContent
            },
            {
                name: 'no StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.noFileContent
            }
        ])

        this._tests.push(noJQuery);

        /**
         * jQuery 2 test
         */

        const jquery2 = Object.assign({}, this.baseTest);
        jquery2.name = " jQuery 2.x.x";
        jquery2.specifics = {
            jsLibrary: ['jquery'],
            jQueryVersion: 2,
            force: true
        };
        jquery2.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.nofileContent
            },
            {
                name: 'no StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.noFileContent
            }
        ])

        this._tests.push(jquery2);

        /**
         * jQuery 3 Test Definition
         */
        const jquery3 = Object.assign({}, this.baseTest);
        jquery3.name = " jQuery 3.x.x";
        jquery3.specifics = {
            jsLibrary: ['jquery'],
            jQueryVersion: 3,
            force: true
        };
        jquery3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'no pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.nofileContent
            },
            {
                name: 'no StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.noFileContent
            }
        ])

        this._tests.push(jquery3);

        /**
         * jQuer 2, pnpjs test
         */
        const jqueryPnPJS2 = Object.assign({}, this.baseTest);
        jqueryPnPJS2.name = " jQuery 2.x.x, pnpjs, ";
        jqueryPnPJS2.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs'],
            jQueryVersion: 2,
            force: true
        };
        jqueryPnPJS2.test = this.baseTest.test.concat([{
                name: 'jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.nofileContent
            },
            {
                name: 'no StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.noFileContent
            }
        ])

        this._tests.push(jqueryPnPJS2);

        /**
         * jquery 3, pnpjs test
         */
        const jqueryPnPJS3 = Object.assign({}, this.baseTest);
        jqueryPnPJS3.name = " jQuery 3.x.x, pnpjs";
        jqueryPnPJS3.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs'],
            jQueryVersion: 3,
            force: true
        };
        jqueryPnPJS3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.nofileContent
            },
            {
                name: 'no StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.noFileContent
            }
        ])

        this._tests.push(jqueryPnPJS3);

        /**
         * jquery 2 pnpjs, property control
         */
        const jqueryPropPnPJS2 = Object.assign({}, this.baseTest);
        jqueryPropPnPJS2.name = " jQuery 2.x.x, pnp/pnpjs, @pnp/spfx-property-controls";
        jqueryPropPnPJS2.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs', '@pnp/spfx-property-controls'],
            jQueryVersion: 2,
            force: true
        };
        jqueryPropPnPJS2.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: '@pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.nofileContent
            },
            {
                name: 'no StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.noFileContent
            }
        ])

        this._tests.push(jqueryPropPnPJS2);

        /**
         * jQUery 3, pnpjs, property control
         */
        const jqueryPropPnPJS3 = Object.assign({}, this.baseTest);
        jqueryPropPnPJS3.name = " jQuery 3.x.x, pnpjs, @pnp/spfx-property-controls";
        jqueryPropPnPJS3.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs', '@pnp/spfx-property-controls'],
            jQueryVersion: 3,
            force: true
        };
        jqueryPropPnPJS3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: '@pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.noFileContent
            },
            {
                name: 'no StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.nofileContent
            },
            {
                name: 'no StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.noFileContent
            },
            {
                name: 'no Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.noFileContent
            }
        ])

        this._tests.push(jqueryPropPnPJS3);

    }

    _generateWebPackTests() {

        const noJQuery = Object.assign({}, this.baseTest);
        const fileContent = new FileContent();
        const testType = new TestType();

        /**
         * No jQuery Test Definition
         */
        noJQuery.name = " No jQuery";
        noJQuery.specifics = {
            vetting: ['webpack-analyzer']
        };
        noJQuery.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.nofileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            }
            // ???
            // ,
            // {
            //     name: 'Webpack analyser',
            //     file: fileContent.package,
            //     expr: /"webpack-bundle-analyzer"/,
            //     type: testType.fileContent
            // }
        ])

        this._tests.push(noJQuery);

        /**
         * jQuery 2 test
         */

        const jquery2 = Object.assign({}, this.baseTest);
        jquery2.name = " jQuery 2.x.x";
        jquery2.specifics = {
            jsLibrary: ['jquery'],
            vetting: ['webpack-analyzer'],
            jQueryVersion: 2,
            force: true
        };
        jquery2.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jquery2);

        /**
         * jQuery 3 Test Definition
         */
        const jquery3 = Object.assign({}, this.baseTest);
        jquery3.name = " jQuery 3.x.x";
        jquery3.specifics = {
            jsLibrary: ['jquery'],
            vetting: ['webpack-analyzer'],
            jQueryVersion: 3,
            force: true
        };
        jquery3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'no pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jquery3);

        /**
         * jQuer 2, pnpjs test
         */
        const jqueryPnPJS2 = Object.assign({}, this.baseTest);
        jqueryPnPJS2.name = " jQuery 2.x.x, pnpjs, ";
        jqueryPnPJS2.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs'],
            vetting: ['webpack-analyzer'],
            jQueryVersion: 2,
            force: true
        };
        jqueryPnPJS2.test = this.baseTest.test.concat([{
                name: 'jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jqueryPnPJS2);

        /**
         * jquery 3, pnpjs test
         */
        const jqueryPnPJS3 = Object.assign({}, this.baseTest);
        jqueryPnPJS3.name = " jQuery 3.x.x, pnpjs";
        jqueryPnPJS3.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs'],
            vetting: ['webpack-analyzer'],
            jQueryVersion: 3,
            force: true
        };
        jqueryPnPJS3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jqueryPnPJS3);

        /**
         * jquery 2 pnpjs, property control
         */
        const jqueryPropPnPJS2 = Object.assign({}, this.baseTest);
        jqueryPropPnPJS2.name = " jQuery 2.x.x, pnp/pnpjs, @pnp/spfx-property-controls";
        jqueryPropPnPJS2.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs', '@pnp/spfx-property-controls'],
            vetting: ['webpack-analyzer'],
            jQueryVersion: 2,
            force: true
        };
        jqueryPropPnPJS2.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: '@pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            }
        ])

        this._tests.push(jqueryPropPnPJS2);

        /**
         * jQUery 3, pnpjs, property control
         */
        const jqueryPropPnPJS3 = Object.assign({}, this.baseTest);
        jqueryPropPnPJS3.name = " jQuery 3.x.x, pnpjs, @pnp/spfx-property-controls";
        jqueryPropPnPJS3.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs', '@pnp/spfx-property-controls'],
            vetting: ['webpack-analyzer'],
            jQueryVersion: 3,
            force: true
        };
        jqueryPropPnPJS3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: '@pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'Webpack analyser',
                file: fileContent.package,
                expr: /"webpack-bundle-analyzer"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jqueryPropPnPJS3);

    }

    _generateStyleLintTests() {

        const noJQuery = Object.assign({}, this.baseTest);
        const fileContent = new FileContent();
        const testType = new TestType();


        /**
         * jQuery 2 test
         */
        const jquery2 = Object.assign({}, this.baseTest);
        jquery2.name = " jQuery 2.x.x";
        jquery2.specifics = {
            jsLibrary: ['jquery'],
            vetting: ['stylelint'],
            jQueryVersion: 2,
            force: true
        };
        jquery2.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jquery2);

        /**
         * jQuery 3 Test Definition
         */
        const jquery3 = Object.assign({}, this.baseTest);
        jquery3.name = " jQuery 3.x.x";
        jquery3.specifics = {
            jsLibrary: ['jquery'],
            vetting: ['stylelint'],
            jQueryVersion: 3,
            force: true
        };
        jquery3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'no pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jquery3);

        /**
         * jQuer 2, pnpjs test
         */
        const jqueryPnPJS2 = Object.assign({}, this.baseTest);
        jqueryPnPJS2.name = " jQuery 2.x.x, pnpjs, ";
        jqueryPnPJS2.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs'],
            vetting: ['stylelint'],
            jQueryVersion: 2,
            force: true
        };
        jqueryPnPJS2.test = this.baseTest.test.concat([{
                name: 'jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jqueryPnPJS2);

        /**
         * jquery 3, pnpjs test
         */
        const jqueryPnPJS3 = Object.assign({}, this.baseTest);
        jqueryPnPJS3.name = " jQuery 3.x.x, pnpjs";
        jqueryPnPJS3.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs'],
            vetting: ['stylelint'],
            jQueryVersion: 3,
            force: true
        };
        jqueryPnPJS3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.noFileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jqueryPnPJS3);

        /**
         * jquery 2 pnpjs, property control
         */
        const jqueryPropPnPJS2 = Object.assign({}, this.baseTest);
        jqueryPropPnPJS2.name = " jQuery 2.x.x, pnp/pnpjs, @pnp/spfx-property-controls";
        jqueryPropPnPJS2.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs', '@pnp/spfx-property-controls'],
            vetting: ['stylelint'],
            jQueryVersion: 2,
            force: true
        };
        jqueryPropPnPJS2.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.fileContent
            },
            {
                name: 'no jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'no @types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.nofileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: '@pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jqueryPropPnPJS2);

        /**
         * jQUery 3, pnpjs, property control
         */
        const jqueryPropPnPJS3 = Object.assign({}, this.baseTest);
        jqueryPropPnPJS3.name = " jQuery 3.x.x, pnpjs, @pnp/spfx-property-controls";
        jqueryPropPnPJS3.specifics = {
            jsLibrary: ['jquery', '@pnp/pnpjs', '@pnp/spfx-property-controls'],
            vetting: ['stylelint'],
            jQueryVersion: 3,
            force: true
        };
        jqueryPropPnPJS3.test = this.baseTest.test.concat([{
                name: 'no jquery 2.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'no @types/jquery 2.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^2\./,
                type: testType.noFileContent
            },
            {
                name: 'jquery 3.x',
                file: fileContent.package,
                expr: /\"jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: '@types/jquery 3.x',
                file: fileContent.package,
                expr: /\"@types\/jquery\": \"\^3\./,
                type: testType.fileContent
            },
            {
                name: 'pnpjs',
                file: fileContent.package,
                expr: /@pnp\/pnpjs/,
                type: testType.fileContent
            },
            {
                name: '@pnp/spfx-property-controls',
                file: fileContent.package,
                expr: /@pnp\/spfx-property-controls/,
                type: testType.fileContent
            },
            {
                name: 'no @pnp/spfx-controls-react',
                file: fileContent.package,
                expr: /@pnp\/spfx-controls-react/,
                type: testType.noFileContent
            },
            {
                name: 'StyleLint Reference',
                file: fileContent.package,
                expr: /"stylelint"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Config Standard',
                file: fileContent.package,
                expr: /"stylelint-config-standard"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint SCSS',
                file: fileContent.package,
                expr: /"stylelint-scss"/,
                type: testType.fileContent
            },
            {
                name: 'StyleLint Gulp',
                file: fileContent.package,
                expr: /"gulp-stylelint"/,
                type: testType.fileContent
            }
        ])

        this._tests.push(jqueryPropPnPJS3);

    }

    get Tests() {

        return this._tests;

    }

}

module.exports = {
    FileContent: new FileContent(),
    TestType: new TestType(),
    TestCase: TestCase,
    BaseTestCase: BaseTestCase,
    TestSuite: TestSuite,
    TestGenerator: TestGenerator
}
