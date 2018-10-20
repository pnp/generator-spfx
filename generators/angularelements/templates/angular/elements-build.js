const concat = require('concat');

(async function build() {
  const files = [
    './dist/angular/runtime.js',
    './dist/angular/polyfills.js',
    './dist/angular/scripts.js',
    './dist/angular/main.js'
  ];
  await concat(files, './dist/angular/angular.bundle.js');
})();
