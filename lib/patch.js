const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');

const pathToUtil = './node_modules/@microsoft/generator-sharepoint/lib/common/utilities.js';
const pathToPatch = './lib/patch/utilities.js';
const pathToPackage = './node_modules/@microsoft/generator-sharepoint/package.json';
const generatorPath = 'lib/generators/';

/** Detect @microsoft/generator-sharepoint path form yarn install */
const getInstallPath = (srcDir) => {

    const generators = require.resolve.paths('@microsoft/generator-sharepoint');
    const basePath = [];

    generators.forEach(item => {

        const requestPath = path.join(
            item,
            '/@microsoft/generator-sharepoint'
        );

        if (fs.existsSync(requestPath)) {

            const targetPath = path.join(requestPath,
                srcDir)
            if (
                fs.existsSync(targetPath)
            ) {
                basePath.push(targetPath);
            }
        }

    });

    if (basePath.length !== 0) {
        return basePath[0]
    }

}

let appCustomizer,
    commandSet;

const installerBaseName = path.basename(process.env.npm_execpath);

/**
 * Check for yarn of pnpm package manager and adjust the fixing require for certain project scaffolding options
 */

if (installerBaseName === 'yarn.js' || installerBaseName === 'pnpm.js' || installerBaseName === 'pnpx.js') {
    // setting and correct the path for commandSet and Application customizser
    appCustomizer = getInstallPath('/lib/generators/applicationCustomizer/templates/none');
    commandSet = getInstallPath('/lib/generators/commandSet/templates/none');
} else {
    appCustomizer = path.resolve('./node_modules/@microsoft/generator-sharepoint/lib/generators/applicationCustomizer/templates/none');
    commandSet = path.resolve('./node_modules/@microsoft/generator-sharepoint/lib/generators/commandSet/templates/none');
}

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
let reactFolderAppCustomizer = path.join(appCustomizer, '../react');

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
