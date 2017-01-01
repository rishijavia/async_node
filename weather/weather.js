const request = require('request');

var getWeather = (location, callback) => {
  request({
    url: `https://api.darksky.net/forecast/1d99c1f346d7e2b53477bd5e35496c8f/${location.latitude},${location.longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200){
       callback(undefined, {
         temperature: body.currently.temperature,
         apparentTemperature: body.currently.apparentTemperature
       });
    }
    else{
      callback('Unable to fetch weather');
    }
  });
}

module.exports.getWeather = getWeather;
