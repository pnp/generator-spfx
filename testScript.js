// const util = require('util');
// const {
//     exec
// } = require('child_process');
// const exec = util.promisify(require('child_process').exec);

const tests = ['./test/onprem.handlebars.test.js'//,
    // './test/onprem.knockout.test.js',
    // './test/onprem.react.test.js',
    // './test/spo.handlebars.test.js',
    // './test/spo.knockout.test.js',
    // './test/spo.react.test.js'
]

// async function executeTest(test) {
//     const {
//         stdout,
//         stderr
//     } = await exec(`mocha ${test}`);
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
// }
const { spawnSync} = require('child_process');
const child = spawnSync('mocha', [tests[0]]);

console.log('error', child.error);
console.log('stdout ', child.stdout);
console.log('stderr ', child.stderr);

// tests.forEach(element => {
//     console.log(element);

//     exec(`mocha ${element}`, (err, stdout, stderr) => {

//         if (err) {
//             // node couldn't execute the command
//             return;
//         }

//         // the *entire* stdout and stderr (buffered)
//         console.log(`stdout: ${stdout}`);
//         console.log(`stderr: ${stderr}`);
//     });

// });