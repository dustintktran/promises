/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var Promise = require('bluebird');

var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  // TODO
  let array = filePaths.map(item => {
    return new Promise((resolve, reject) => {
      fs.readFile(item, 'utf8', (err, success) => {
        if (err) {
          reject(err)
        } else {
          let first = success.split("\n")[0]
          resolve(first);
        }
      })
    })
  })

  return Promise.all(array)
    .then(data => data.join('\n'))
    .then(data => {
      console.log("our data!!!", data)
      return new Promise((resolve, reject) => {
        fs.writeFile(writePath, data, 'utf8', (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })

    })

};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};