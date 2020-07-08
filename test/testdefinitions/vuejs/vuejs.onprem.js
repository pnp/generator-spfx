const baseTest = require('../../tools/testGenerator/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "VueJS";
testSuite.environment = "onprem";
testSuite.framework = "vuejs";

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on premises?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"onprem\"/,
        type: baseTest.TestType.fileContent
    },
    {
        name: 'VueJS Class Component',
        file: baseTest.FileContent.package,
        expr: /vue-class-component/,
        type: baseTest.TestType.fileContent
    },
    {
        name: 'VueJS Property Dectorator',
        file: baseTest.FileContent.package,
        expr: /vue-property-decorator/,
        type: baseTest.TestType.fileContent
    },
    {
        name: 'VueJS Webpack loader',
        file: baseTest.FileContent.package,
        expr: /vue-loader/,
        type: baseTest.TestType.fileContent
    },
    {
        name: 'VueJS Tempalte compiler',
        file: baseTest.FileContent.package,
        expr: /vue-template-compiler/,
        type: baseTest.TestType.fileContent
    }
];

baseTestCase.test.push(...additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
