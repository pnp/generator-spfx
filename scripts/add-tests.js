'use strict'
const fs = require('fs');
const path = require('path');


let files = fs.readdirSync(
    path.join(
        __dirname,
        '../test/'
    )
)

let testFiles = files.map(file => {

    if (file.indexOf('test.js') !== -1) {

        let fileInfo = file.split('.');

        // check for valid naming conventions
        if (fileInfo.length === 4) {

            return {
                'env': fileInfo[0],
                'franework': fileInfo[1],
                'filepath': file
            }

        }

    }

}).filter(element => element !== undefined);

console.log(testFiles);
