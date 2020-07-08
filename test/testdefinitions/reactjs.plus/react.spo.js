const baseTest = require('../../tools/testGenerator/coreTestDefinition');
// const testCase1 = require('./testCase1');

const testSuite = new baseTest.TestSuite();

testSuite.name = "ReactJS Plus";
testSuite.environment = "spo";
testSuite.framework = "reactjs.plus";

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on SPO?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"spo\"/,
        type: baseTest.TestType.fileContent
    }
];

const removeTests = [{
    name: 'No ReactJS',
    file: baseTest.FileContent.package,
    expr: /react/,
    type: baseTest.TestType.noFileContent
}, {
    name: 'No ReactJS Dom',
    file: baseTest.FileContent.package,
    expr: /react-dom/,
    type: baseTest.TestType.noFileContent
}]

baseTestCase.test = baseTestCase.test.filter(elem => {

    let validTestNames = removeTests.map(elem => {
        return elem.name;
    })

    if (validTestNames.indexOf(elem.name) === -1){
        return elem;
    }

})


baseTestCase.test.push(...additonalTests);

const allTests = new baseTest.TestGenerator(baseTestCase);

testSuite.definitions = allTests.Tests;

module.exports = testSuite;
