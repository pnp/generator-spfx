const chalk = require('chalk');

// format background forground
const outRedWhite = chalk.white.bgRed;

module.exports = {
    cmdOptions: ` These${outRedWhite(' are ')}the command line options `
};