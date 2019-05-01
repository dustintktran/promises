/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');

var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {

  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, 'utf8', (err, success) => {
      if (err) {
        reject(err)
      } else {
        let first = success.split("\n")[0]
        resolve(first) // danthareja
      }
    })
  })
    .then((data) => {
      return new Promise((resolve, reject) => {
        request({
          url: `https://api.github.com/users/${data}`,
          headers: {'Accept': 'application/vnd.github.v3+json'}
        }, function (error, response, body) {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      })
    })// danthareja)
  .then((data) => {
    let body = data.body;
    return new Promise((resolve, reject) => {
      fs.writeFile(writeFilePath, body, 'utf8', (err) => {
        if (err){
          reject(err)
        } else {
          resolve(body);
        }
      })
    })
  }) //200

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};


