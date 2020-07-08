const baseTest = require('../../tools/testGenerator/coreTestDefinition');


const testSuite = new baseTest.TestSuite();

testSuite.name = "No Framework";
testSuite.environment = "onprem";
testSuite.framework = "none";

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on premises?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"onprem\"/,
        type: baseTest.TestType.fileContent
    }
];

baseTestCase.test.push(...additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
