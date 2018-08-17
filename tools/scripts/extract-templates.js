const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const wpTemplateSrc = '../node_modules/\@microsoft/generator-sharepoint/lib/generators/webpart/templates/none/';
const wpTemplateDest = '../templates/webparts/'

const fileLocations = [{
        name: 'webpart-spo',
        tmplSrc: '../node_modules/\@microsoft/generator-sharepoint/lib/generators/webpart/templates/none/',
        tmplDest: '../templates/webparts-spo/'
    },
    {
        name: 'webpart-onprem',
        tmplSrc: '../node_modules/\@microsoft/generator-sharepoint/lib/generators/onPremWebpart/templates/none/',
        tmplDest: '../templates/webparts-onprem/'
    }, {
        name: 'fieldCustomizer',
        tmplSrc: '../node_modules/\@microsoft/generator-sharepoint/lib/generators/fieldCustomizer/templates/none/',
        tmplDest: '../templates/fieldcustomizer-spo/'
    }, {
        name: 'commandset',
        tmplSrc: '../node_modules/\@microsoft/generator-sharepoint/lib/generators/commandSet/templates/none/',
        tmplDest: '../templates/commandset-spo/'
    },
    {
        name: 'applicationCustomizer',
        tmplSrc: '../node_modules/\@microsoft/generator-sharepoint/lib/generators/applicationCustomizer/templates/none/',
        tmplDest: '../templates/applicationcustomizer-spo/'
    }
]

fileLocations.forEach(item => {
    var files = fs.readdirSync(
        path.join(__dirname,
            item.tmplSrc,
        ));

        console.log(chalk.yellow(item.name+': '))

    for (let i = 0; i < files.length; i++) {

        console.log(files[i]);

        fs.copyFileSync(
            path.join(__dirname,
                item.tmplSrc,
                files[i]
            ),
            path.join(
                __dirname,
                item.tmplDest,
                files[i]
            )
        )

    }
})
