var Clarifai = require('clarifai');
var request = require('request');
var Promise = require('bluebird');

var clarifaiApp = new Clarifai.App({
  apiKey: 'e623e1f51882429d82c4f90818f59d30'
});

// 38.140.216.106.
/*
 * getIntersection(arrays) =>
 *   @param {Array} arrays - an array of arrays, each containing a set of values
 *   @return {Array} - a single array with the intersection of values from all arrays
 */

var getIntersection = function(arrays) {
  return arrays.shift().filter(function(v) {
    return arrays.every(function(a) {
      return a.indexOf(v) !== -1;
    });
  });
};

/**
 * getGitHubProfile(handle) =>
 *   @param {String} handle - the handle of a GitHub user
 *   @return {Promise} - resolves with the user's profile in the following format:
 *     {
 *       handle: 'danthareja',
 *       name: 'Dan Thareja',
 *       avatarUrl: 'https://avatars.githubusercontent.com/u/6980359?v=3.jpg'
 *     }
 */

var getGitHubProfile = function(user) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true // will JSON.parse(body) for us
  };

  return new Promise(function(resolve, reject) {
    request.get(options, function(err, data, body) {
      if (err) { return reject(err); }

      var simpleProfile = {
        handle: body.login,
        name: body.name,
        avatarUrl: body.avatar_url + '.jpg', // extension necessary for image tagger
      };
      resolve(simpleProfile);
    });
  });
};


/**
 * predictImage(imageUrl) =>
 *   @param {String} imageUrl - the url of the image you want to tag
 *   @return {Promise} - resolves with an array of tags
 */

// var predictImage = function (imageUrl) {

//   if (clarifaiApp._config.apiKey === 'FILL ME IN ') {
//     throw new Error('You must add your API key before you can predict an image');
//   }

//   console.log(clarifaiApp.models)
//   return clarifaiApp.models.predict(Clarifai.GENERAL_MODEL, imageUrl)
//     .then(function (response) {
      
//       return response.outputs[0].data.concepts.map(function ({ name }) {
        
//         return name;
//       });
//     })
//     .catch(function (err) {
//       return err;
//     });
// };

var predictImage = (imageUrl) => {
  clarifaiApp.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        // console.log(generalModel);
        return generalModel.predict(imageUrl);
      })
      .then(response => {
        // console.log(response)
        var concepts = response['outputs'][0]['data']['concepts']
        // console.log(concepts)
      })
}


// console.log(getGitHubProfile('dustintktran'))

module.exports = {
  predictImage: predictImage,
  getIntersection: getIntersection,
  getGitHubProfile: getGitHubProfile,
};
