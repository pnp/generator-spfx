const baseTest = require('../../../tools/test-engine/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "ReactJS Plus";
testSuite.environment = "onprem19";
testSuite.framework = "reactjs.plus";
testSuite.component = {
    componentType: 'extension',
    extensionType: 'FieldCustomizer'
}


const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on-premises 2019?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"onprem19\"/,
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
        expr: /(?=.*\bextensionType\b)(?=.*\bFieldCustomizer\b).+/gi
    },
    {
        name: 'ReactJS',
        file: baseTest.FileContent.package,
        expr: /react/,
        type: baseTest.TestType.fileContent
    }, {
        name: 'ReactJS Dom',
        file: baseTest.FileContent.package,
        expr: /react-dom/,
        type: baseTest.TestType.FileContent
    }
];

const removeTests = [{
    name: 'No ReactJS',
}, {
    name: 'No ReactJS Dom',
}, {
    name: 'Is WebPart?'
}]

baseTestCase.removeTests(removeTests);
baseTestCase.addTests(additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
