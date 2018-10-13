const baseTest = require('../../../tools/test-engine/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "VueJS";
testSuite.environment = "spo";
testSuite.framework = "vuejs";
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



const removeTests = [
    { name: 'Is WebPart?' }
];

baseTestCase.removeTests(removeTests);
baseTestCase.addTests(additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
