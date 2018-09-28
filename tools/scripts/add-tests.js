'use strict'
const fs = require('fs');
const path = require('path');

const packagePath = path.resolve(__dirname, '../../package.json');
const testPath = path.resolve(__dirname, '../../test/')

let files = fs.readdirSync(testPath);

let testFiles = files.map(file => {

    if (file.indexOf('test.js') !== -1) {

        let fileInfo = file.split('.');

        // check for valid naming conventions
        if (fileInfo.length === 4) {

            return {
                'env': fileInfo[0],
                'framework': fileInfo[1],
                'filepath': './test/' + file
            }

        }

    }

}).filter(element => element !== undefined);

var onPremTests = testFiles.filter(item => item.env === 'onprem')
    .map(item => 'mocha ' + item.filepath)
    .join(' && ');

var spoTests = testFiles.filter(item => item.env === 'spo')
    .map(item => 'mocha ' + item.filepath)
    .join(' && ');

var hbsTests = testFiles.filter(item => item.framework === 'handlebars')
    .map(item => 'mocha ' + item.filepath)
    .join(' && ');

var reactTests = testFiles.filter(item => item.framework === 'react')
    .map(item => 'mocha ' + item.filepath)
    .join(' && ');

var knockoutTests = testFiles.filter(item => item.framework === 'knockout')
    .map(item => 'mocha ' + item.filepath)
    .join(' && ');

var vuejsTests = testFiles.filter(item => item.framework = 'vuejs')
    .map(item => 'mocha ' + item.filepath)
    .join(' && ');

console.log('On Prem Tests:  ', onPremTests);
console.log('On SPO:         ', spoTests);
console.log('Handlebars:     ', hbsTests);
console.log('React:          ', reactTests);
console.log('Knockout:       ', knockoutTests);
console.log('VueJs:          ', vuejsTests);

var scripts = {
    "test-onprem": onPremTests,
    "test-spo": spoTests,
    "test-handlebars": hbsTests,
    "test-react": reactTests,
    "test-knockout": knockoutTests,
    "test-vuejs": vuejsTests,
    "test": onPremTests + " && " + spoTests,
    "postinstall": "node lib/patch.js"
}

let packageJson = JSON.parse(
    fs.readFileSync(packagePath, 'utf-8')
)

if (packageJson['script'] === undefined) {

    packageJson.scripts = scripts;

}

console.log(packagePath);

fs.writeFileSync(
    packagePath,
    JSON.stringify(packageJson, null, 2)
)
