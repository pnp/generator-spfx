const concat = require('concat');
const fs = require('fs');

/**
 * Get the list of files from given directory with specified file extension. 
 * @param {string} directoryPath
 * @param {string} fileExtension
 */
function getFilesFromDirByType(directoryPath, fileExtension) {
  return new Promise((resolve, reject) => {
    return fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return reject(`ERR! ${err.code}: no such file or directory ${err.path}`);
      }
      return resolve(files.filter(f => f.endsWith(`.${fileExtension}`)));
    });
  });
}

(async function build() {
  
  /**
   * Get the JS files from `./dist/<%= angularSolutionName %>/` directory and combine it into `bundle.js`
   * This will give support for angular v6 and all above versions.
   */
 
  try {
    let directoryPath = './dist/<%= angularSolutionName %>/';
    let files = await getFilesFromDirByType(directoryPath, 'js');
    files = files.map(file => directoryPath + file);
    await concat(files, './dist/<%= angularSolutionName %>/bundle.js');
  } catch (error) {
    console.log(error);
  }
})();
