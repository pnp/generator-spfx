const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const generators = './node_modules/@microsoft/generator-sharepoint/lib/generators';

const generatorFolders = fs.readdirSync(generators),
    baseTemplatePath = "./tools/spfx/";

generatorFolders.forEach((folder) => {

    let templateFolderPath = path.join(generators, folder, 'templates/none');

    if (fs.existsSync(templateFolderPath)) {

        let folderPath = null;

        if (folder.toLowerCase().indexOf('onprem19') !== -1) {
            console.log(folder, "---------- ON PREM 19");

            folderPath = folder.toLowerCase().replace('onprem19', '') + "-onprem19";
        } else {
            if (folder.toLowerCase().indexOf('onprem') !== -1) {
                console.log(folder, "---------- ON PREM");
                folderPath = folder.toLowerCase().replace('onprem', '') + "-onprem19";
            } else {
                console.log(folder, "---------- SPO");
                folderPath = folder.toLowerCase() + "-spo";
            }
        }

        if (folderPath !== null) {

            let curTemplatePath = path.join(baseTemplatePath,
                folderPath);

            if (fs.existsSync(curTemplatePath)) {
                console.log('Exits\n',
                    curTemplatePath
                );
            } else {
                console.log('create\n',
                    curTemplatePath
                );
                fs.mkdirSync(curTemplatePath);
            }

            let files = fs.readdirSync(templateFolderPath);

            files.forEach((file) => {

                console.log(file);

                fs.copyFileSync(
                    path.join(templateFolderPath,
                        file
                    ),
                    path.join(
                        curTemplatePath,
                        file
                    )
                )

            })

        }


    }

})
