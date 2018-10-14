const baseTest = require('../../../tools/test-engine/coreTestDefinition');


const testSuite = new baseTest.TestSuite();

testSuite.name = "Handlebars";
testSuite.environment = "onprem";
testSuite.framework = "handlebars";
testSuite.component = {
    componentType: 'webpart'
}

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on premises?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"onprem\"/,
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
