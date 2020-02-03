const request = require('request');

const geocode = (address, callback) => {
    const mapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoianRuZmFybGV5IiwiYSI6ImNqcnA4Mm56cDFiYnI0OXBuZzJkbHdsNmYifQ.Cr_EF-wd0XlkC2D8WmVuxQ";
    request({url:mapbox,json:true}, (err, resp) => {
        const {features} = resp.body;
        callback(features[0].center, err);
    });
}

module.exports = geocode;