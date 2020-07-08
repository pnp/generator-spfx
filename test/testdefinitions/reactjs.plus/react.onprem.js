const baseTest = require('../../tools/testGenerator/coreTestDefinition');

const testSuite = new baseTest.TestSuite();

testSuite.name = "ReactJS Plus";
testSuite.environment = "onprem";
testSuite.framework = "reactjs.plus";

const baseTestCase = new baseTest.BaseTestCase();
const additonalTests = [{
        name: 'Is on on-premises?',
        file: baseTest.FileContent.yorc,
        expr: /\"environment\": \"onprem\"/,
        type: baseTest.TestType.fileContent
    }
];

const removeTests = [{
    name: 'ReactJS',
    file: baseTest.FileContent.package,
    expr: /react/,
    type: baseTest.TestType.noFileContent
}, {
    name: 'ReactJS Dom',
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
