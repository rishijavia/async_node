const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Adress to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.a);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address');
  }

  var location = {
    latitude: response.data.results[0].geometry.location.lat,
    longitude: response.data.results[0].geometry.location.lng
  };

  var weatherURL = `https://api.darksky.net/forecast/1d99c1f346d7e2b53477bd5e35496c8f/${location.latitude},${location.longitude}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);

}).then((response) => {
  var temp = response.data.currently.temperature;
  var appTemp = response.data.currently.apparentTemperature;
  console.log(`It is ${temp} but it feels like ${appTemp}`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log('Unable to connect to API server');
  }else{
    console.log(e.message);
  }
});
