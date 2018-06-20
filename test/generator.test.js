/* eslint-env jest, mocha */
const path = require('path');
const rimraf = require('rimraf');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const tempPath = 'tmp';

describe('First Test', () => {

    helpers.run(path.join(__dirname, '../app'))
        .inTmpDir(function (dir) {
            var done = this.async(); // `this` is the RunContext object.
            fs.copy(path.join(__dirname, '../templates/common'), dir, done);
        })
        .withPrompts({
            coffee: false
        });

});

// describe('addon test', () => {

//     // before(done => {
//     helpers.run(path.join(__dirname, '../app'))
//         .inDir(path.join(__dirname, 'tmp'))
//         .withArguments([
//             // '--skip-install',
//             '--component-type', 'webpart',
//             '--component-description', 'HelloWorld',
//             '--component-name', 'helloworld',
//             '--solution-name', 'HelloWorld',
//             '--environment', 'spo'
//         ])
//         .withPrompts({
//             framework: 'handlebars',
//             jsLibrary: ['jquery', 'pnpjs'],
//             jQueryVersion: 3
//         })
//         .withGenerators(
//             [
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/app'),
//                     '@microsoft/sharepoint'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/applicationCustomizer'),
//                     '@microsoft/sharepoint:applicationCustomizer'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/commandSet'),
//                     '@microsoft/sharepoint:commandSet'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/component'),
//                     '@microsoft/sharepoint:component'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/extension'),
//                     '@microsoft/sharepoint:extension'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/fieldCustomizer'),
//                     '@microsoft/sharepoint:fieldCustomizer'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/onPremComponent'),
//                     '@microsoft/sharepoint:onPremComponent'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/onPremWebpart'),
//                     '@microsoft/sharepoint:onPremWebpart'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/solution'),
//                     '@microsoft/sharepoint:solution'
//                 ],
//                 [
//                     require('@microsoft/generator-sharepoint/lib/generators/webpart'),
//                     '@microsoft/sharepoint:webpart'
//                 ]

//             ])
//         .on('error', (err) {
//             console.log(err);
//         })
//         .on('end', done)


//     it('should add dependencies', () => {


//         assert.fileContent('package.json', '"jquery"');
//         assert.fileContent('package.json', '"@pnp/pnpjs"');
//     });

// });