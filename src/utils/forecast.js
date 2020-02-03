const request = require('request');

const forecast = (latlong, callback) => {
    const url = 'https://api.darksky.net/forecast/aec973df90a4c6bf91dfae4506b69765/'+latlong[1]+','+latlong[0];
    request({url:url, json:true}, (err, resp) => {
        const {currently, daily}  = resp.body;
        callback(daily.data[0].summary + " It is currently "+currently.temperature+" degrees in Fleetwood, PA, with "+currently.precipProbability+"% chance of rain...", err);
    });
}

module.exports = forecast;