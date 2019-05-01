/**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of concepts between
 * multiple github profile pictures
 *
 * Given an array of github handles, searchCommonConceptsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of concepts for each avatar_url (requires API key)
 *   5) find the intersection of the concepts
 *
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var Promise = require('bluebird');
var lib = require('../../lib/advancedChainingLib');
var request = require('request');

// We're using Clarifai's API to recognize concepts in an image into a list of concepts
// Visit the following url to sign up for a free account
//     https://developer.clarifai.com/login/
// Then, create a new API Key and add your API key to the
// `advancedChainingLib.js` file. When creating an API key, you can give it
// the `Predict on Public and Custom Models` scope

var searchCommonConceptsFromGitHubProfiles = function (githubHandles) {
  //input : array ...
  let array = githubHandles.map((user) => {
    return new Promise((resolve, reject) => {
      request({
        url: `https://api.github.com/users/${user}`,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'user-agent': 'node.js'
        }
      }, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          var parsed = JSON.parse(response.body);
          console.log(parsed)
          resolve(parsed.avatar_url);
        }
      });
    })
  })

  return Promise.all(array)
    .then(data => {
      // console.log(data[0])
      let final = data.map((url) => {
        return new Promise((resolve, reject) => {
          lib.predictImage(url)
          // console.log(lib.predictImage(url))
          // .then(result => console.log(result))
        })
      })
      // console.log(final)
    })
    // .then(data => console.log(data))
  //

};


// Export these functions so we can unit test them
module.exports = {
  searchCommonConceptsFromGitHubProfiles,
};

