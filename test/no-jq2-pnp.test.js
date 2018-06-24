/* eslint-env jest, mocha */
'use strict';

const path = require('path');
const rimraf = require('rimraf');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

const tempPath = path.join(__dirname, 'tmp');

let spfxGenerators = require('./settings/spfxgenerators');

let webPartConfig = {
    componentType: 'webpart',
    componentDescription: 'HelloWorld',
    componentName: 'helloworld',
    solutionName: 'HelloWorld',
    // environment: 'onprem',
    framework: 'none'
}

// rimraf.sync(tempPath);

describe('moses', ()=>{


describe('WebPart: No Framework + jQuery@2 + pnpjs', () => {

    const localTemp = path.join(tempPath, 'No-JQ2-pnp');

    let testConfig = {
        framework: 'noframework',
        jsLibrary: ['jquery', 'pnpjs'],
        jQueryVersion: 2
    };

    before((done) => {

        helpers.run(path.join(__dirname, '../app'))
            .inDir(localTemp)
            .withGenerators(
                spfxGenerators
            )
            .withOptions(webPartConfig) // Mock options passed in
            .withPrompts(testConfig)
            .on('end', done);

    });

    // after(() => {
    //     rimraf.sync(path.join(__dirname, 'tmp'));
    // });

    let packageFile = path.join(localTemp, 'package.json');


    it('no react', () => {

        assert.noFileContent(packageFile, /react|react-dom/);
    })

    it('no knockout', () => {

        assert.noFileContent(packageFile, /knockout/);
    })

    it('pnpjs', () => {

        assert.fileContent(packageFile, /\"@pnp\/pnpjs\"/);
    })

    it('jquery', () => {

        assert.fileContent(packageFile, /\"jquery\": \"\^2\./);

    })

});
describe('WebPart 2: No Framework + jQuery@2 + pnpjs', () => {

    const localTemp = path.join(tempPath, 'No-JQ2-pnp');

    let testConfig = {
        framework: 'noframework',
        jsLibrary: ['jquery', 'pnpjs'],
        jQueryVersion: 2
    };

    before((done) => {

        return helpers.run(path.join(__dirname, '../app'))
            .inDir(localTemp)
            .withGenerators(
                spfxGenerators
            )
            .withOptions(webPartConfig) // Mock options passed in
            .withPrompts(testConfig)
            .on('end', done);

    });

    // after(() => {
    //     rimraf.sync(path.join(__dirname, 'tmp'));
    // });

    // describe('package.json contains', () => {

    let packageFile = path.join(localTemp, 'package.json');


    it('no react', () => {

        assert.noFileContent(packageFile, /react|react-dom/);
    })

    it('no knockout', () => {

        assert.noFileContent(packageFile, /knockout/);
    })

    it('pnpjs', () => {

        assert.fileContent(packageFile, /\"@pnp\/pnpjs\"/);
    })

    it('jquery', () => {

        assert.fileContent(packageFile, /\"jquery\": \"\^2\./);

    })

    // })

});

})


// describe('test 1', () => {

//     before(() => {
//         // run yeoman
//     });

//     it('test', () => {
//         // test some thigs
//     });
// });

// describe('test 2', () => {

//     before(() => {
//         // run yeoman with other options
//     });

//     it('test', () => {
//         // test some thigs
//     });
// });