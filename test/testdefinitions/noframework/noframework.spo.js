const baseTest = require('../../tools/testGenerator/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "No Framework";
testSuite.environment = "spo";
testSuite.framework = "none";

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on SPO?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"spo\"/,
        type: baseTest.TestType.fileContent
    }
];

baseTestCase.test.push(...additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
