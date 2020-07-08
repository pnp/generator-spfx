const baseTest = require('../../tools/testGenerator/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "Handlebars";
testSuite.environment = "spo";
testSuite.framework = "handlebars";

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on SPO?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"spo\"/,
        type: baseTest.TestType.fileContent
    },
    {
        name: 'Handlebars',
        file: baseTest.FileContent.package,
        expr: /handlebars/,
        type: baseTest.TestType.fileContent
    }
];

baseTestCase.test.push(...additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
