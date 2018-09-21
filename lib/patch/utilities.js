"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
const fs = require("fs");
const lodash = require("lodash");
const path = require("path");
const uuid = require("uuid");
function titleCase(str) {
    str = lodash.camelCase(str);
    return lodash.upperFirst(str);
}
exports.titleCase = titleCase;
function untokenize(str, props) {
    for (const prop in props) {
        if (props.hasOwnProperty(prop) && typeof props[prop] === 'string') {
            str = str.replace(new RegExp(`{${prop}}`, 'g'), props[prop]);
        }
    }
    // Convert file name prefix with '_' to '.'
    const basename = path.basename(str);
    if (basename[0] === '_') {
        const filename = '.' + basename.substr(1);
        const dirname = path.dirname(str);
        str = path.join(dirname, filename);
    }
    return str;
}
exports.untokenize = untokenize;
function filesIn(...args) {
    const inputPath = path.join.apply(undefined, args);
    const files = [];
    function traversePath(innerPath) {
        const subPaths = fs.readdirSync(innerPath)
            .filter(filename => filename !== '.' && filename !== '..')
            .map(filename => path.join(innerPath, filename));
        const subFiles = subPaths
            .filter(pathname => fs.statSync(pathname).isFile())
            .map(pathname => path.relative(inputPath, pathname));
        const subFolders = subPaths
            .filter(pathname => fs.statSync(pathname).isDirectory());
        subFolders.forEach(traversePath);
        files.push.apply(files, subFiles);
    }
    traversePath(inputPath);
    return files;
}
exports.filesIn = filesIn;
function checkSolutionFolder(generator, solutionName) {
    if (!solutionName) {
        generator.log(colors.red('!!! Warning !!!'));
        return generator.prompt([
            {
                type: 'confirm',
                name: 'continue',
                default: undefined,
                message: 'You are not running under solution folder. Continue?'
            }
        ]).then((answers) => {
            if (answers.continue) {
                return solutionName; // resolve with the solution name
            }
            else {
                throw generator.log(colors.red('Bye!'));
            }
        });
    }
    else {
        return Promise.resolve(solutionName);
    }
}
exports.checkSolutionFolder = checkSolutionFolder;
function generateGuid() {
    return uuid.v4();
}
exports.generateGuid = generateGuid;
// tslint:disable-next-line
function compose(generator, base, options) {
    base.composeWith(path.resolve(path.join(__dirname, '../generators/', generator)), options);
}
exports.compose = compose;