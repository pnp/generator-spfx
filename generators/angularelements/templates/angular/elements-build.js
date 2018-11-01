const concat = require('concat');

(async function build() {
  const files = [
    './dist/<%= angularSolutionName %>/runtime.js',
    './dist/<%= angularSolutionName %>/polyfills.js',
    './dist/<%= angularSolutionName %>/scripts.js',
    './dist/<%= angularSolutionName %>/main.js'
  ];
  await concat(files, './dist/<%= angularSolutionName %>/bundle.js');
})();
