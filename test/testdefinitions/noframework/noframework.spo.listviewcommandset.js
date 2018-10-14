const baseTest = require('../../../tools/test-engine/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "No Framework";
testSuite.environment = "spo";
testSuite.framework = "none";
testSuite.component = {
    componentType: 'extension',
    extensionType: 'ListViewCommandSet'
}

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on SPO?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"spo\"/,
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
        expr: /(?=.*\bextensionType\b)(?=.*\bListViewCommandSet\b).+/gi
    }
];

const removeTests = [{
        name: 'Is WebPart?'
    }
];

baseTestCase.removeTests(removeTests);
baseTestCase.addTests(additonalTests);

// baseTestCase.test.push(...additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
