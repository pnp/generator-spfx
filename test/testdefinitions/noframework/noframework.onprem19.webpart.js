const baseTest = require('../../../tools/test-engine/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "No Framework";
testSuite.environment = "onprem19";
testSuite.framework = "none";
testSuite.component = {
    componentType: 'webpart'
}

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
    name: 'Is on-prem 2019?',
    file: baseTest.FileContent.yorc,
    expr: /\"environment\": \"onprem19\"/,
    type: baseTest.TestType.fileContent
}];

baseTestCase.test.push(...additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
