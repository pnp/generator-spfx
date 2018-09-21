const fs = require('fs');
const path = require('path');

const pathToUtil = "./node_modules/@microsoft/generator-sharepoint/lib/common/utilities.js";
const pathToPatch = "./lib/patch/utilities.js";
const pathToPackage = "./node_modules/@microsoft/generator-sharepoint/package.json";
const generatorPath = "lib/generators/";


console.log('POST INSTALL');

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
