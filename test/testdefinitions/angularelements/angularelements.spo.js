const baseTest = require('../../tools/testGenerator/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "Angular Elements";
testSuite.environment = "onprem";
testSuite.framework = "angularelements";


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
