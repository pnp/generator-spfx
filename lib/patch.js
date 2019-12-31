const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');

const pathToUtil = './node_modules/@microsoft/generator-sharepoint/lib/common/utilities.js';
const pathToPatch = './lib/patch/utilities.js';
const pathToPackage = './node_modules/@microsoft/generator-sharepoint/package.json';
const generatorPath = 'lib/generators/';

const appCustomizer = path.join(__dirname, '../node_modules/@microsoft/generator-sharepoint/lib/generators/applicationCustomizer/templates/none');
const commandSet = path.join(__dirname, '../node_modules/@microsoft/generator-sharepoint/lib/generators/commandSet/templates/none');

console.log('🚀', appCustomizer);
console.log('🚀', path.resolve('@microsoft/generator-sharepoint'));

// console.log('MODULE SEARCH PATHs ::::\n\t', module.paths);
// console.log('Current __dirname\n\t',__dirname);
// console.log('process.cwd() ::::\n\t', process.cwd());
// console.log('process.cwd() ::::\n\t', require.resolve('fs'));

const basePath = require.resolve.paths('@microsoft/generator-sharepoint')
    .filter(item => {

        const requestPath = path.join(
            item,
            '/@microsoft/generator-sharepoint'
        );
        if (fs.existsSync(requestPath)) {
            console.log('🚀🚀🚀 FOUND:\n\t', requestPath);
            return requestPath;
        } else {
            // console.log('not found in ', path.join(
            //     item,
            //     '@microsoft/generator-sharepoint'
            // ))
        }
    });

// console.log('BASEPATH Found ::::\n', basePath);

// console.log('Require Resolve  ::: require.resolve(\'@microsoft/generator-sharepoint\') RESULT:::');
// console.log('Require Resolve  :::\n', require.resolve('@microsoft/generator-sharepoint'));

// return;

const copy = (srcDir, dstDir) => {

    let results = [];
    let list = fs.readdirSync(srcDir);
    let src, dst;

    list.forEach(function (file) {
        src = srcDir + '/' + file;
        dst = dstDir + '/' + file;

        let stat = fs.statSync(src);
        if (stat && stat.isDirectory()) {
            try {

                fs.mkdirSync(dst);

            } catch (e) {

                console.log('\ndirectory already exists: ' + dst);

            }

            results = results.concat(copy(src, dst));

        } else {

            try {

                fs.writeFileSync(dst, fs.readFileSync(src));

            } catch (e) {

                console.log('\ncould\'t copy file: ' + dst);

            }

            results.push(src);
        }

    });

    return results;

}

/**
 * Patching generator loading
 */
if (fs.existsSync(pathToUtil) &&
    fs.existsSync(pathToPatch)) {

    const patch = fs.readFileSync(
        path.resolve(pathToPatch)
    )

    try {
        fs.writeFileSync(
            path.resolve(pathToUtil),
            patch.toString(),
            'utf-8'
        )
    } catch (error) {
        console.error(error)
    }

}

/**
 * Patching package.json
 */
if (fs.existsSync(pathToPackage)) {

    try {

        const pkgContent = fs.readFileSync(pathToPackage, 'utf-8');

        try {

            let pkgJson = JSON.parse(pkgContent);

            pkgJson.files = [
                generatorPath
            ];

            fs.writeFileSync(
                pathToPackage,
                JSON.stringify(pkgJson, null, 4),
                'utf-8')

        } catch (error) {

            console.log(error)

        }

    } catch (error) {

        console.log(error);
    }

}

/**
 * Copy folder content to React
 */
let reactFolderAppCustomizer = path.resolve(appCustomizer, '../react');

if (!fs.existsSync(reactFolderAppCustomizer)) {

    fs.mkdirSync(reactFolderAppCustomizer);

    copy(
        path.resolve(appCustomizer),
        reactFolderAppCustomizer
    )
}

/**
 * Copy folder content to Knockout
 */
let knockoutFolderAppCustomizer = path.resolve(appCustomizer, '../knockout');

if (!fs.existsSync(knockoutFolderAppCustomizer)) {

    fs.mkdirSync(knockoutFolderAppCustomizer);

    copy(
        path.resolve(appCustomizer),
        knockoutFolderAppCustomizer
    )
}

/**
 * Copy folder content to React
 */
let reactFolderCommandSet = path.resolve(commandSet, '../react');
const telemetry = require('./telemetry');

if (!fs.existsSync(reactFolderCommandSet)) {

    fs.mkdirSync(reactFolderCommandSet);

    copy(
        path.resolve(commandSet),
        reactFolderCommandSet
    )
}

/**
 * Copy folder content to Knockout
 */
let knockoutFolderCommandSet = path.resolve(commandSet, '../knockout');

if (!fs.existsSync(knockoutFolderCommandSet)) {

    fs.mkdirSync(knockoutFolderCommandSet);

    copy(
        path.resolve(commandSet),
        knockoutFolderCommandSet
    )
}

// Track install count and version
telemetry.trackEvent("Install", {
    "version": pkg.version
})
