const fs = require('fs');
const path = require('path');

const pathToUtil = './node_modules/@microsoft/generator-sharepoint/lib/common/utilities.js';
const pathToPatch = './lib/patch/utilities.js';
const pathToPackage = './node_modules/@microsoft/generator-sharepoint/package.json';
const generatorPath = 'lib/generators/';

const appCustomizer = './node_modules/@microsoft/generator-sharepoint/lib/generators/applicationCustomizer/templates/none';
const commandSet = './node_modules/@microsoft/generator-sharepoint/lib/generators/commandSet/templates/none';

console.log('POST INSTALL');


const copy = (srcDir, dstDir) => {

    let results = [];
    let list = fs.readdirSync(srcDir);
    let src, dst;

    list.forEach(function (file) {
        src = srcDir + '/' + file;
        dst = dstDir + '/' + file;
        //console.log(src);
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
 * Patching generatore loading
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
let knockoutFolderCommanSet = path.resolve(commandSet, '../knockout');

if (!fs.existsSync(knockoutFolderCommanSet)) {

    fs.mkdirSync(knockoutFolderCommanSet);

    copy(
        path.resolve(commandSet),
        knockoutFolderCommanSet
    )
}
