const baseTest = require('../../../tools/test-engine/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "Knockout";
testSuite.environment = "onprem19";
testSuite.framework = "knockout";
testSuite.component = {
    componentType: 'extension',
    extensionType: 'ApplicationCustomizer'
}

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on-premises 2019?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"onprem19\"/,
        type: baseTest.TestType.fileContent
    },
    {
        name: 'Knockout',
        file: baseTest.FileContent.package,
        expr: /knockout/,
        type: baseTest.TestType.fileContent
    },
    {
        name: "Is extension?",
        file: baseTest.FileContent.yorc,
        expr: /(?=.*\bcomponentType\b)(?=.*\bextension\b).+/gi
    },
    {
        name: "Is List View Command Set?",
        file: baseTest.FileContent.yorc,
        expr: /(?=.*\bextensionType\b)(?=.*\ApplicationCustomizer\b).+/gi
    }
];

const removeTests = [{
        name: 'Is WebPart?'
    },
    {
        name: 'No KnockoutJS'
    }
];

baseTestCase.removeTests(removeTests);
baseTestCase.addTests(additonalTests);

// baseTestCase.test.push(...additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
