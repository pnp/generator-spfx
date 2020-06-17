const concat = require('concat');

(async function build() {  
  const files = <% if (parseFloat(ngVersion) < 8.3) { %> [
    './dist/<%= angularSolutionName %>/runtime.js',
    './dist/<%= angularSolutionName %>/polyfills.js',
    './dist/<%= angularSolutionName %>/scripts.js',
    './dist/<%= angularSolutionName %>/main.js'
  ];
  <% } else { %> [
      './dist/<%= angularSolutionName %>/runtime-es5.js',
      './dist/<%= angularSolutionName %>/runtime-es2015.js',
      './dist/<%= angularSolutionName %>/polyfills-es5.js',
      './dist/<%= angularSolutionName %>/polyfills-es2015.js',
      './dist/<%= angularSolutionName %>/main-es5.js',
      './dist/<%= angularSolutionName %>/main-es2015.js'
    ];
  <% } %>

  await concat(files, './dist/<%= angularSolutionName %>/bundle.js');
})();
